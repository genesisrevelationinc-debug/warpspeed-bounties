 ```diff
--- /dev/null
+++ b/services/attachment-summarizer/.env.example
@@ -0,0 +1,21 @@
+# AWS SQS Configuration
+AWS_REGION=us-east-1
+AWS_ACCESS_KEY_ID=your-access-key
+AWS_SECRET_ACCESS_KEY=your-secret-key
+SQS_QUEUE_URL=https://sqs.us-east-1.amazonaws.com/123456789012/attachment-events
+
+# Google Cloud Storage Configuration
+GCS_PROJECT_ID=your-gcs-project-id
+GCS_BUCKET_NAME=your-attachment-bucket
+GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account-key.json
+
+# Ollama / LLM Configuration
+OLLAMA_BASE_URL=http://localhost:11434
+OLLAMA_MODEL=llama3.2
+SUMMARY_MAX_TOKENS=500
+
+# Application Configuration
+NODE_ENV=development
+LOG_LEVEL=info
+PROCESSING_TIMEOUT_MS=300000
+MAX_FILE_SIZE_MB=50
+
--- /dev/null
+++ services/attachment-summarizer/.gitignore
@@ -0,0 +1,35 @@
+# Dependencies
+node_modules/
+package-lock.json
+yarn.lock
+
+# Build output
+dist/
+build/
+*.tsbuildinfo
+
+# Environment variables
+.env
+.env.local
+.env.*.local
+
+# Logs
+logs/
+*.log
+npm-debug.log*
+
+# Testing
+coverage/
+.nyc_output/
+
+# IDE
+.idea/
+.vscode/
+*.swp
+*.swo
+
+# OS
+.DS_Store
+Thumbs.db
+
+# Temporary files
+tmp/
+temp/
+uploads/
+
--- /dev/null
+++ services/attachment-summarizer/Dockerfile
@@ -0,0 +1,45 @@
+# Build stage
+FROM node:20-alpine AS builder
+
+WORKDIR /app
+
+# Install dependencies for native modules
+RUN apk add --no-cache python3 make g++
+
+COPY package*.json ./
+COPY prisma ./prisma/
+
+RUN npm ci
+
+COPY . .
+
+RUN npm run build
+RUN npx prisma generate
+
+# Production stage
+FROM node:20-alpine AS production
+
+WORKDIR /app
+
+# Install runtime dependencies for file processing
+RUN apk add --no-cache \
+    libreoffice \
+    poppler-utils \
+    tesseract-ocr \
+    tesseract-ocr-data-eng \
+    && rm -rf /var/cache/apk/*
+
+# Create non-root user
+RUN addgroup -g 1001 -S nodejs && \
+    adduser -S nodejs -u 1001
+
+COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist
+COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
+COPY --from=builder --chown=nodejs:nodejs /app/package*.json ./
+COPY --from=builder --chown=nodejs:nodejs /app/prisma ./prisma
+
+USER nodejs
+
+EXPOSE 3000
+
+HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
+    CMD node -e "require.resolve('./dist/healthcheck.js')" || exit 1
+
+CMD ["node", "dist/index.js"]
+
--- /dev/null
+++ services/attachment-summarizer/docker-compose.yml
@@ -0,0 +1,68 @@
+version: '3.8'
+
+services:
+  app:
+    build:
+      context: .
+      dockerfile: Dockerfile
+    container_name: attachment-summarizer
+    environment:
+      - NODE_ENV=production
+      - DATABASE_URL=postgresql://postgres:postgres@db:5432/attachments?schema=public
+      - REDIS_URL=redis://redis:6379
+    env_file:
+      - .env
+    depends_on:
+      db:
+        condition: service_healthy
+      redis:
+        condition: service_started
+      ollama:
+        condition: service_started
+    volumes:
+      - ./tmp:/app/tmp
+    networks:
+      - attachment-network
+
+  db:
+    image: postgres:15-alpine
+    container_name: attachment-db
+    environment:
+      POSTGRES_USER: postgres
+      POSTGRES_PASSWORD: postgres
+      POSTGRES_DB: attachments
+    volumes:
+      - postgres-data:/var/lib/postgresql/data
+    healthcheck:
+      test: ["CMD-SHELL", "pg_isready -U postgres"]
+      interval: 5s
+      timeout: 5s
+      retries: 5
+    networks:
+      - attachment-network
+
+  redis:
+    image: redis:7-alpine
+    container_name: attachment-redis
+    networks:
+      - attachment-network
+
+  ollama:
+    image: ollama/ollama:latest
+    container_name: attachment-ollama
+    volumes:
+      - ollama-data:/root/.ollama
+    environment:
+      - OLLAMA_HOST=0.0.0.0
+    networks:
+      - attachment-network
+
+volumes:
+  postgres-data:
+  ollama-data:
+
+networks:
+  attachment-network:
+    driver: bridge
+
--- /dev/null
+++ services/attachment-summarizer/jest.config.js
@@ -0,0 +1,20 @@
+/** @type {import('ts-jest').JestConfigWithTsJest} */
+module.exports = {
+  preset: 'ts-jest',
+  testEnvironment: 'node',
+  roots: ['<rootDir>/src'],
+  testMatch: ['**/__tests__/**/*.test.ts', '**/?(*.)+(spec|test).ts'],
+  transform: {
+    '^.+\\.ts$': 'ts-jest',
+  },
+  collectCoverageFrom: [
+    'src/**/*.ts',
+    '!src/**/*.d.ts',
+    '!src/**/__tests__/**',
+  ],
+  coverageDirectory: 'coverage',
+  coverageReporters: ['text', 'lcov', 'html'],
+  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.ts'],
+  testTimeout: 30000,
+};
+
--- /dev/null
+++ services/attachment-summarizer/package.json
@@ -0,0 +1,65 @@
+{
+  "name": "attachment-summarizer",
+  "version": "1.0.0",
+  "description": "Node.js service that consumes email attachment events from SQS