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
+# Ollama LLM
+OLLAMA_BASE_URL=http://localhost:11434
+OLLAMA_MODEL=llama3.2
+OLLAMA_SUMMARY_MAX_TOKENS=500
+
+# Application
+NODE_ENV=development
+LOG_LEVEL=info
+MAX_FILE_SIZE_MB=50
+SUPPORTED_MIME_TYPES=application/pdf,text/plain,text/html,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,image/jpeg,image/png,image/gif
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
+# Install dependencies for native modules
+RUN apk add --no-cache python3 make g++
+
+COPY package*.json ./
+COPY tsconfig.json ./
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
+# Copy built application
+COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist
+COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
+COPY --from=builder --chown=nodejs:nodejs /app/package*.json ./
+
+# Create temp directory for downloads
+RUN mkdir -p /tmp/attachments && chown -R nodejs:nodejs /tmp/attachments
+
+USER nodejs
+
+EXPOSE 3000
+
+ENV NODE_ENV=production
+ENV PORT=3000
+
+HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
+    CMD node -e "require('http').get('http://localhost:3000/health', (r) => r.statusCode === 200 ? process.exit(0) : process.exit(1))"
+
+CMD ["node", "dist/index.js"]
\ No newline at end of file
--- /dev/null
+++ 	b/services/attachment-summarizer/docker-compose.yml
@@ -0,0 +1,56 @@
+version: '3.8'
+
+services:
+  attachment-summarizer:
+    build:
+      context: .
+      dockerfile: Dockerfile
+    container_name: attachment-summarizer
+    restart: unless-stopped
+    ports:
+      - "3000:3000"
+    environment:
+      - NODE_ENV=production
+      - AWS_REGION=${AWS_REGION}
+      - AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
+      - AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
+      - SQS_QUEUE_URL=${SQS_QUEUE_URL}
+      - GCS_PROJECT_ID=${GCS_PROJECT_ID}
+      - GCS_BUCKET_NAME=${GCS_BUCKET_NAME}
+      - GOOGLE_APPLICATION_CREDENTIALS=/secrets/gcs-key.json
+      - OLLAMA_BASE_URL=http://ollama:11434
+      - OLLAMA_MODEL=${OLLAMA_MODEL:-llama3.2}
+      - LOG_LEVEL=${LOG_LEVEL:-info}
+    volumes:
+      - ${GOOGLE_APPLICATION_CREDENTIALS}:/secrets/gcs-key.json:ro
+    depends_on:
+      ollama:
+        condition: service_healthy
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
+    healthcheck:
+      test: ["CMD", "curl", "-f", "http://localhost:11434/api/tags"]
+      interval: 30s
+      timeout: 10s
+      retries: 5
+      start_period: 60s
+    deploy:
+      resources:
+        reservations:
+          devices:
+            - driver: nvidia
+              count: 1
+              capabilities: [gpu]
+    networks:
+      - attachment-summarizer-network
+
+volumes:
+  ollama-data:
+
+networks:
+  attachment-summarizer-network:
+    driver: bridge
\ No newline at end of file
--- /dev/null
+++ 	b/services/attachment-summarizer/jest.config.js
@@ -0,0 +1,18 @@
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
+  collectCoverageFrom: [
+    'src/**/*.ts',
+    '!src/**/*.d.ts',
+    '!src/index.ts',
