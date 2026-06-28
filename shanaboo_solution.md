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
+GCS_BUCKET_NAME=your-bucket-name
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
+SUPPORTED_MIME_TYPES=application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/plain,text/html,image/png,image/jpeg,image/gif
+
+# Database (Prisma)
+DATABASE_URL=postgresql://user:password@localhost:5432/attachment_summarizer
--- /dev/null
+++ b/b/services/attachment-summarizer/.gitignore
@@ -0,0 +1,5 @@
+node_modules
+dist
+.env
+*.log
+coverage
--- /dev/null
+++ b/b/services/attachment-summarizer/Dockerfile
@@ -0,0 +1,52 @@
+# Build stage
+FROM node:20-alpine AS builder
+
+WORKDIR /app
+
+# Install dependencies for native modules
+RUN apk add --no-cache python3 make g++ \
+    && ln -sf python3 /usr/bin/python
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
+# Install runtime dependencies
+RUN apk add --no-cache \
+    libreoffice \
+    poppler-utils \
+    tesseract-ocr \
+    tesseract-ocr-data-eng \
+    && ln -sf python3 /usr/bin/python
+
+# Create non-root user
+RUN addgroup -g 1001 -S nodejs && \
+    adduser -S nodejs -u 1001
+
+# Copy built application
+COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist
+COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
+COPY --from=builder --chown=nodejs:nodejs /app/package*.json ./
+COPY --from=builder --chown=nodejs:nodejs /app/prisma ./prisma
+
+# Generate Prisma client in production
+RUN npx prisma generate
+
+USER nodejs
+
+ENV NODE_ENV=production
+ENV PORT=3000
+
+EXPOSE 3000
+
+CMD ["node", "dist/index.js"]
--- /dev/null
+++ b/b/services/attachment-summarizer/docker-compose.yml
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
+      - DATABASE_URL=postgresql://postgres:postgres@db:5432/attachment_summarizer
+      - AWS_REGION=${AWS_REGION}
+      - AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
+      - AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
+      - SQS_QUEUE_URL=${SQS_QUEUE_URL}
+      - GCS_BUCKET_NAME=${GCS_BUCKET_NAME}
+      - GOOGLE_APPLICATION_CREDENTIALS=/app/credentials/gcs-key.json
+      - OLLAMA_BASE_URL=http://ollama:11434
+      - OLLAMA_MODEL=${OLLAMA_MODEL:-llama3.2}
+    volumes:
+      - ./credentials:/app/credentials:ro
+    depends_on:
+      - db
+      - ollama
+    networks:
+      - attachment-summarizer-network
+
+  db:
+    image: postgres:15-alpine
+    container_name: attachment-summarizer-db
+    restart: unless-stopped
+    environment:
+      - POSTGRES_USER=postgres
+      - POSTGRES_PASSWORD=postgres
+      - POSTGRES_DB=attachment_summarizer
+    volumes:
+      - postgres_data:/var/lib/postgresql/data
+    networks:
+      - attachment-summarizer-network
+
+  ollama:
+    image: ollama/ollama:latest
+    container_name: attachment-summarizer-ollama
+    restart: unless-stopped
+    volumes:
+      - ollama_data:/root/.ollama
+    networks:
+      - attachment-summarizer-network
+    # GPU support (optional)
+    # deploy:
+    #   resources:
+    #     reservations:
+    #       devices:
+    #         - driver: nvidia
+    #           count: 1
+    #           capabilities: [gpu]
+
+volumes:
+  postgres_data:
+  ollama_data:
+
+networks:
+  attachment-summarizer-network:
+    driver: bridge
--- /dev/null
+++ b/b/services/attachment-summarizer/jest.config.js
@@ -0,0 +1,18 @@
+/** @type {import('jest').Config} */
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
+  testTimeout: 30000,
+};
--- /dev/null
+++ 	b/services/