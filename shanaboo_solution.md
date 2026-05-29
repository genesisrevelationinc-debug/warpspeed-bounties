```diff
--- /dev/null
+++ b/b/services/attachment-summarizer/.dockerignore
@@ -0,0 +1,6 @@
+node_modules
+dist
+.env
+*.log
+coverage
+.git
\ No newline at end of file
--- /dev/null
+++ b/b/services/attachment-summarizer/.env.example
@@ -0,0 +1,21 @@
+# AWS SQS Configuration
+AWS_REGION=us-east-1
+AWS_ACCESS_KEY_ID=your-access-key
+AWS_SECRET_ACCESS_KEY=your-secret-key
+SQS_QUEUE_URL=https://sqs.us-east-1.amazonaws.com/123456789012/attachment-events
+
+# Google Cloud Storage
+GCS_PROJECT_ID=your-gcs-project-id
+GCS_BUCKET_NAME=your-attachment-bucket
+GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account-key.json
+
+# Ollama / LLM Configuration
+OLLAMA_BASE_URL=http://localhost:11434
+OLLAMA_MODEL=llama3.2
+SUMMARY_MAX_LENGTH=500
+
+# Application
+NODE_ENV=development
+LOG_LEVEL=info
+MAX_FILE_SIZE_MB=50
+SUPPORTED_MIME_TYPES=application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/plain,text/html,image/png,image/jpeg
\ No newline at end of file
--- /dev/null
+++ 	b/services/attachment-summarizer/.gitignore
@@ -0,0 +1,5 @@
+node_modules
+dist
+.env
+*.log
+coverage
\ No newline at end of file
--- /dev/null
+++ 	b/services/attachment-summarizer/Dockerfile
@@ -0,0 +1,52 @@
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
+# Copy package files
+COPY package*.json ./
+COPY prisma ./prisma/
+
+# Install production dependencies only
+RUN npm ci --only=production && \
+    npx prisma generate
+
+# Copy built files from builder
+COPY --from=builder /app/dist ./dist
+
+# Create non-root user
+RUN addgroup -g 1001 -S nodejs && \
+    adduser -S nodejs -u 1001
+
+USER nodejs
+
+EXPOSE 3000
+
+CMD ["node", "dist/index.js"]
\ No newline at end of file
--- /dev/null
+++ 	b/services/attachment-summarizer/docker-compose.yml
@@ -0,0 +1,56 @@
+version: '3.8'
+
+services:
+  app:
+    build:
+      context: .
+      dockerfile: Dockerfile
+    container_name: attachment-summarizer
+    restart: unless-stopped
+    env_file:
+      - .env
+    environment:
+      - NODE_ENV=production
+      - OLLAMA_BASE_URL=http://ollama:11434
+    depends_on:
+      - ollama
+      - db
+    volumes:
+      - ./tmp:/app/tmp
+    networks:
+      - attachment-summarizer-network
+
+  ollama:
+    image: ollama/ollama:latest
+    container_name: ollama
+    restart: unless-stopped
+    volumes:
+      - ollama-data:/root/.ollama
+    networks:
+      - attachment-summarizer-network
+    # For GPU support, uncomment:
+    # deploy:
+    #   resources:
+    #     reservations:
+    #       devices:
+    #         - driver: nvidia
+    #           count: 1
+    #           capabilities: [gpu]
+
+  db:
+    image: postgres:15-alpine
+    container_name: attachment-summarizer-db
+    restart: unless-stopped
+    environment:
+      POSTGRES_USER: postgres
+      POSTGRES_PASSWORD: postgres
+      POSTGRES_DB: attachment_summarizer
+    volumes:
+      - postgres-data:/var/lib/postgresql/data
+    networks:
+      - attachment-summarizer-network
+
+volumes:
+  ollama-data:
+  postgres-data:
+
+networks:
+  attachment-summarizer-network:
+    driver: bridge
\ No newline at end of file
--- /dev/null
+++ 	b/services/attachment-summarizer/jest.config.js
@@ -0,0 +1,15 @@
+/** @type {import('ts-jest').JestConfigWithTsJest} */
+module.exports = {
+  preset: 'ts-jest',
+  testEnvironment: 'node',
+  roots: ['<rootDir>/src'],
+  testMatch: ['**/__tests__/**/*.test.ts'],
+  transform: {
+    '^.+\\.tsx?$': 'ts-jest',
+  },
+  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
+  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.d.ts', '!src/**/__tests__/**'],
+  coverageDirectory: 'coverage',
+  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.ts'],
+  testTimeout: 30000,
+};
\ No newline at end of file
--- /dev/null
+++ 	b/services/attachment-summarizer/package.json
@@ -0,0 +1,62 @@
+{
+  "name": "attachment-summarizer",
+  "version": "1.0.0",
+  "description": "Node.js service that consumes email attachment events from SQS, extracts content, and generates summaries using a local LLM",
+  "main": "dist/index.js",
+  "scripts": {
+    "build": "tsc",
+    "start": "node dist/index.js",
+    "dev": "ts-node-dev --respawn --transpile-only src/index.ts",
+    "test": "jest",
