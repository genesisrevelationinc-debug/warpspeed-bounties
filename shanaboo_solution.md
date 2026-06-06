 ```diff
--- /dev/null
+++ b/services/attachment-summarizer/.env.example
@@ -0,0 +1,22 @@
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
+# Ollama LLM Configuration
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
+--- /dev/null
+++  services/attachment-summarizer/.gitignore
@@ -0,0 +1,35 @@
+# Dependencies
+node_modules/
+
+# Build output
+dist/
+build/
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
+# Coverage
+coverage/
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
+--- /dev/null
+++  services/attachment-summarizer/Dockerfile
@@ -0,0 +1,35 @@
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
+
+# Production stage
+FROM node:20-alpine AS production
+
+WORKDIR /app
+
+# Install runtime dependencies for file processing
+RUN apk add --no-cache libreoffice poppler-utils
+
+COPY package*.json ./
+COPY prisma ./prisma/
+
+RUN npm ci --only=production
+
+COPY --from=builder /app/dist ./dist
+
+EXPOSE 3000
+
+USER node
+
+CMD ["node", "dist/index.js"]
+
+--- /dev/null
+++  services/attachment-summarizer/docker-compose.yml
@@ -0,0 +1,50 @@
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
+      - OLLAMA_BASE_URL=http://ollama:11434
+    env_file:
+      - .env
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
+    ports:
+      - "11434:11434"
+    networks:
+      - attachment-summarizer-network
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
+
+--- /dev/null
+++  services/attachment-summarizer/jest.config.js
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
+};
+
+--- /dev/null
+++  services/attachment-summarizer/package.json
@@ -0,0 +1,62 @@
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
+    "test:coverage": "jest --coverage",
+    "lint": "eslint src/**/*.ts",
+    "db:migrate": "prisma migrate dev",
+    "db:generate": "prisma generate",
+    "db:studio": "prisma studio"
+  },
+  "keywords": [
+    "sqs",
+    "gcs",
+    "ollama",
+    "llm",
+    "summarization",
+    "attachments"
+  ],
+  "author": "",
+  "license": "MIT",
+  "dependencies": {
+    "@aws-sdk/client-sqs": "^3.478.0",
+    "@google-cloud