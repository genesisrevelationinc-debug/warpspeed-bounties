 ```diff
--- /dev/null
+++ b/services/attachment-summarizer/.dockerignore
@@ -0,0 +1,6 @@
+node_modules
+dist
+.env
+*.log
+coverage
+.git
--- /dev/null
+++ services/attachment-summarizer/.env.example
@@ -0,0 +1,15 @@
+# AWS SQS
+AWS_REGION=us-east-1
+AWS_ACCESS_KEY_ID=your-access-key
+AWS_SECRET_ACCESS_KEY=your-secret-key
+SQS_QUEUE_URL=https://sqs.us-east-1.amazonaws.com/123456789012/attachment-events
+
+# Google Cloud Storage
+GCS_BUCKET_NAME=your-bucket-name
+GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account-key.json
+
+# Ollama LLM
+OLLAMA_BASE_URL=http://localhost:11434
+OLLAMA_MODEL=llama3.2
+
+# Application
+LOG_LEVEL=info
+MAX_FILE_SIZE_MB=50
--- /dev/null
+++ services/attachment-summarizer/.gitignore
@@ -0,0 +1,5 @@
+node_modules
+dist
+.env
+*.log
+coverage
--- /dev/null
+++ services/attachment-summarizer/Dockerfile
@@ -0,0 +1,35 @@
+# Build stage
+FROM node:20-alpine AS builder
+
+WORKDIR /app
+
+COPY package*.json ./
+COPY tsconfig.json ./
+
+RUN npm ci
+
+COPY src ./src
+
+RUN npm run build
+
+# Production stage
+FROM node:20-alpine AS production
+
+WORKDIR /app
+
+# Install dependencies for file processing
+RUN apk add --no-cache \
+    poppler-utils \
+    libreoffice \
+    tesseract-ocr \
+    tesseract-ocr-data-eng
+
+COPY package*.json ./
+
+RUN npm ci --only=production && npm cache clean --force
+
+COPY --from=builder /app/dist ./dist
+
+ENV NODE_ENV=production
+EXPOSE 3000
+
+CMD ["node", "dist/index.js"]
--- /dev/null
+++ services/attachment-summarizer/docker-compose.yml
@@ -0,0 +1,50 @@
+version: '3.8'
+
+services:
+  app:
+    build:
+      context: .
+      dockerfile: Dockerfile
+    container_name: attachment-summarizer
+    env_file:
+      - .env
+    environment:
+      - OLLAMA_BASE_URL=http://ollama:11434
+    depends_on:
+      - ollama
+      - db
+    volumes:
+      - ${GOOGLE_APPLICATION_CREDENTIALS}:/app/gcp-key.json:ro
+    networks:
+      - attachment-summarizer-network
+
+  ollama:
+    image: ollama/ollama:latest
+    container_name: ollama
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
+    environment:
+      POSTGRES_USER: postgres
+      POSTGRES_PASSWORD: postgres
+      POSTGRES_DB: attachment_summarizer
+    volumes:
+      - postgres-data:/var/lib/postgresql/data
+    ports:
+      - "5432:5432"
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
--- /dev/null
+++ services/attachment-summarizer/jest.config.js
@@ -0,0 +1,15 @@
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
+  verbose: true,
+};
--- /dev/null
+++ services/attachment-summarizer/package.json
@@ -0,0 +1,52 @@
+{
+  "name": "attachment-summarizer",
+  "version": "1.0.0",
+  "description": "Node.js service that consumes email attachment events from SQS, extracts content, and generates summaries using a local LLM",
+  "main": "dist/index.js",
+  "scripts": {
+    "build": "tsc",
+    "start": "node dist/index.js",
+    "dev": "ts-node src/index.ts",
+    "test": "jest",
+    "test:watch": "jest --watch",
+    "test:coverage": "jest --coverage",
+    "lint": "eslint src/**/*.ts",
+    "db:migrate": "prisma migrate dev",
+    "db:generate": "prisma generate",
+    "db:studio": "prisma studio"
+  },
+  "keywords": [
+    "attachment",
+    "summarizer",
+    "sqs",
+    "gcs",
+    "llm",
+    "ollama"
+  ],
+  "author": "",
+  "license": "MIT",
+  "dependencies": {
+    "@aws-sdk/client-sqs": "^3.450.0",
+    "@google-cloud/storage": "^7.7.0",
+    "@prisma/client": "^5.6.0",
+    "axios": "^1.6.2",
+    "dotenv": "^16.3.1",
+    "mammoth": "^1.6.0",
+    "pdf-parse": "^1.1.1",
+    "pino": "^8.16.2",
+    "xlsx": "^0.18.5"
+  },
+  "devDependencies": {
+    "@types/jest": "^29.5.10",
+    "@types/node": "^20.10.0",
+    "@types/pdf-parse": "^1.1.4",
+    "eslint": "^8.54.0",
+    "jest": "^29.7.0",
+    "prisma": "^5.6.0",
+    "ts-jest": "^29.1.1",
+    "ts-node