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
+
--- /dev/null
+++ services/attachment-summarizer/.gitignore
@@ -0,0 +1,35 @@
+# Dependencies
+node_modules/
+package-lock.json
+yarn.lock
+pnpm-lock.yaml
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
+yarn-debug.log*
+yarn-error.log*
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
+# Install runtime dependencies
+RUN apk add --no-cache libreoffice tesseract-ocr
+
+# Copy package files and install production dependencies
+COPY package*.json ./
+COPY prisma ./prisma/
+RUN npm ci --only=production && npx prisma generate
+
+# Copy built application from builder
+COPY --from=builder /app/dist ./dist
+
+# Create temp directory for downloads
+RUN mkdir -p /tmp/attachments
+
+# Expose port for health checks
+EXPOSE 3000
+
+# Start the application
+CMD ["node", "dist/index.js"]
+
--- /dev/null
+++ services/attachment-summarizer/docker-compose.yml
@@ -0,0 +1,56 @@
+version: '3.8'
+
+services:
+  attachment-summarizer:
+    build:
+      context: .
+      dockerfile: Dockerfile
+    container_name: attachment-summarizer
+    env_file:
+      - .env
+    environment:
+      - NODE_ENV=production
+      - OLLAMA_BASE_URL=http://ollama:11434
+    depends_on:
+      - postgres
+      - ollama
+    volumes:
+      - ./tmp:/tmp/attachments
+    networks:
+      - attachment-summarizer-network
+    restart: unless-stopped
+
+  postgres:
+    image: postgres:15-alpine
+    container_name: attachment-summarizer-db
+    environment:
+      POSTGRES_USER: postgres
+      POSTGRES_PASSWORD: postgres
+      POSTGRES_DB: attachment_summarizer
+    volumes:
+      - postgres_data:/var/lib/postgresql/data
+    ports:
+      - "5432:5432"
+    networks:
+      - attachment-summarizer-network
+
+  ollama:
+    image: ollama/ollama:latest
+    container_name: attachment-summarizer-llm
+    volumes:
+      - ollama_data:/root/.ollama
+    ports:
+      - "11434:11434"
+    networks:
+      - attachment-summarizer-network
+    # Pull default model on first start
+    entrypoint: >
+      sh -c "ollama serve & sleep 10 && ollama pull llama3.2 && wait"
+
+volumes:
+  postgres_data:
+  ollama_data:
+
+networks:
+  attachment-summarizer-network:
+    driver: bridge
+
--- /dev/null
+++ services/attachment-summarizer/jest.config.js
@@ -0,0 +1,18 @@
+/** @type {import('ts-jest').JestConfigWithTsJest} */
+module.exports = {
+  preset: 'ts-jest',
+  testEnvironment: 'node',
+  roots: ['<rootDir>/src'],
+  testMatch: ['**/__tests__/**/*.test.ts'],
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
+};
+
--- /dev/null
+++ services/attachment-summarizer/package.json
@@ -0,0 +1,65 @@
+{
+  "name": "attachment-summarizer",
+  "version": "1.0.0",
+  "description": "Node.js service that consumes email attachment events from SQS, extracts content, and generates summaries using a local LLM",
+  "main": "dist/index.js",
+  "scripts": {
+    "build": "tsc",
+    "start": "node dist/index.js",
+    "dev": "ts-node-dev --respawn src/index.ts",
+    "test": "jest",
+    "test:watch": "jest --watch",
+    "test:coverage": "