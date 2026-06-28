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
+MAX_FILE_SIZE_MB=50
+SUPPORTED_MIME_TYPES=application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/plain,text/html,image/png,image/jpeg,image/gif
+PROCESSING_TIMEOUT_MS=300000
\ No newline at end of file
--- /dev/null
+++ services/attachment-summarizer/.dockerignore
@@ -0,0 +1,15 @@
+node_modules
+dist
+coverage
+.env
+.env.local
+.env.*.local
+*.log
+.git
+.gitignore
+.DS_Store
+Dockerfile
+docker-compose.yml
+.dockerignore
+npm-debug.log
+yarn-error.log
\ No newline at end of file
--- /dev/null
+++ services/attachment-summarizer/.gitignore
@@ -0,0 +1,15 @@
+node_modules
+dist
+coverage
+.env
+.env.local
+.env.*.local
+*.log
+.DS_Store
+npm-debug.log
+yarn-error.log
+.idea
+.vscode
+*.swp
+*.swo
+tmp/
\ No newline at end of file
--- /dev/null
+++ services/attachment-summarizer/Dockerfile
@@ -0,0 +1,50 @@
+# Build stage
+FROM node:20-alpine AS builder
+
+WORKDIR /app
+
+# Install dependencies for building native modules
+RUN apk add --no-cache python3 make g++
+
+# Copy package files
+COPY package*.json ./
+COPY prisma ./prisma/
+
+# Install dependencies
+RUN npm ci
+
+# Generate Prisma client
+RUN npx prisma generate
+
+# Copy source code
+COPY . .
+
+# Build TypeScript
+RUN npm run build
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
+    tesseract-ocr-data-eng
+
+# Copy package files and install production dependencies
+COPY package*.json ./
+COPY prisma ./prisma/
+RUN npm ci --only=production && npx prisma generate
+
+# Copy built files from builder
+COPY --from=builder /app/dist ./dist
+
+# Create temp directory for file processing
+RUN mkdir -p /tmp/attachments
+
+EXPOSE 3000
+
+CMD ["node", "dist/index.js"]
\ No newline at end of file
--- /dev/null
+++ services/attachment-summarizer/docker-compose.yml
@@ -0,0 +1,60 @@
+version: '3.8'
+
+services:
+  app:
+    build:
+      context: .
+      dockerfile: Dockerfile
+    container_name: attachment-summarizer
+    restart: unless-stopped
+    ports:
+      - "3000:3000"
+    environment:
+      - NODE_ENV=production
+      - DATABASE_URL=postgresql://postgres:postgres@db:5432/attachments?schema=public
+      - REDIS_URL=redis://redis:6379
+      - OLLAMA_BASE_URL=http://ollama:11434
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
+      - ./tmp:/tmp/attachments
+    networks:
+      - attachment-summarizer-network
+
+  db:
+    image: postgres:15-alpine
+    container_name: attachment-db
+    restart: unless-stopped
+    environment:
+      - POSTGRES_USER=postgres
+      - POSTGRES_PASSWORD=postgres
+      - POSTGRES_DB=attachments
+    volumes:
+      - postgres_data:/var/lib/postgresql/data
+    networks:
+      - attachment-summarizer-network
+    healthcheck:
+      test: ["CMD-SHELL", "pg_isready -U postgres"]
+      interval: 5s
+      timeout: 5s
+      retries: 5
+
+  redis:
+    image: redis:7-alpine
+    container_name: attachment-redis
+    restart: unless-stopped
+    networks:
+      - attachment-summarizer-network
+
+  ollama:
+    image: ollama/ollama:latest
+    container_name: attachment-ollama
+    restart: unless-stopped
+    volumes:
+      - ollama_data:/root/.ollama
+    networks:
+      - attachment-summarizer-network
+
+volumes:
+  postgres_data:
+  ollama_data:
+
+networks:
+  attachment-summarizer-network:
+    driver: bridge
\ No newline at end of file
--- /dev/null
+++ services/attachment-summarizer/jest.config.js
@@ -0,0 +1,20 @@
+/** @type {import('ts-jest').JestConfigWithTsJest} */
+module.exports = {
+  preset: 'ts-jest',
+  testEnvironment: 'node',
+  roots: ['<rootDir>/src'],
+  testMatch: ['**/__tests__/**/*.test.ts'],
+  transform: {
+    '^.+\\.tsx?$': 'ts-jest',
+  },
+  moduleNameMapper: {
+    '^@/(.*)$': '<rootDir>/src/$1',
+  },
+  collectCoverageFrom: [
+    'src/**/*.ts',
+    '!src/**/*.d.ts',
+    '!src/index.ts',
+  ],
+  coverageDirectory: 'coverage',
+  coverageReporters: ['text', 'lc