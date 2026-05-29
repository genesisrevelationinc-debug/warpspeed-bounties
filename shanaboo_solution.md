```diff
--- /dev/null
+++ b/services/attachment-summarizer/.dockerignore
@@ -0,0 +1,15 @@
+node_modules
+dist
+.env
+.env.local
+coverage
+.nyc_output
+*.log
+.git
+.gitignore
+README.md
+Dockerfile
+docker-compose.yml
+.docker
+*.test.ts
+*.spec.ts
--- /dev/null
+++ services/attachment-summarizer/.env.example
@@ -0,0 +1,23 @@
+# Server
+PORT=3000
+NODE_ENV=development
+
+# AWS SQS
+AWS_REGION=us-east-1
+AWS_ACCESS_KEY_ID=
+AWS_SECRET_ACCESS_KEY=
+SQS_QUEUE_URL=
+SQS_VISIBILITY_TIMEOUT=300
+SQS_WAIT_TIME_SECONDS=20
+
+# Google Cloud Storage
+GCS_BUCKET_NAME=
+GCS_PROJECT_ID=
+GCS_KEY_FILENAME=
+GCS_TEMP_DIR=/tmp/attachments
+
+# Ollama LLM
+OLLAMA_BASE_URL=http://localhost:11434
+OLLAMA_MODEL=llama3.2
+SUMMARY_MAX_TOKENS=500
+SUMMARY_TEMPERATURE=0.3
--- /dev/null
+++ services/attachment-summarizer/.gitignore
@@ -0,0 +1,15 @@
+node_modules
+dist
+.env
+.env.local
+coverage
+.nyc_output
+*.log
+*.tmp
+*.temp
+/tmp/attachments/*
+!/tmp/attachments/.gitkeep
+/uploads
+.DS_Store
+*.swp
+*.swo
+*~
--- /dev/null
+++ services/attachment-summarizer/Dockerfile
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
+    python3 \
+    libreoffice \
+    poppler-utils \
+    tesseract-ocr \
+    tesseract-ocr-data-eng \
+    && ln -sf python3 /usr/bin/python
+
+# Create temp directory for attachments
+RUN mkdir -p /tmp/attachments && chmod 777 /tmp/attachments
+
+# Copy built application
+COPY --from=builder /app/dist ./dist
+COPY --from=builder /app/node_modules ./node_modules
+COPY --from=builder /app/package*.json ./
+
+# Create non-root user
+RUN addgroup -g 1001 -S nodejs && \
+    adduser -S nodejs -u 1001
+
+USER nodejs
+
+EXPOSE 3000
+
+ENV NODE_ENV=production
+ENV GCS_TEMP_DIR=/tmp/attachments
+
+HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
+    CMD node -e "require('http').get('http://localhost:3000/health', (r) => r.statusCode === 200 ? process.exit(0) : process.exit(1))"
+
+CMD ["node", "dist/index.js"]
--- /dev/null
+++ services/attachment-summarizer/docker-compose.yml
@@ -0,0 +1,56 @@
+version: '3.8'
+
+services:
+  app:
+    build:
+      context: .
+      dockerfile: Dockerfile
+    ports:
+      - "3000:3000"
+    environment:
+      - NODE_ENV=production
+      - AWS_REGION=${AWS_REGION}
+      - AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
+      - AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
+      - SQS_QUEUE_URL=${SQS_QUEUE_URL}
+      - GCS_BUCKET_NAME=${GCS_BUCKET_NAME}
+      - GCS_PROJECT_ID=${GCS_PROJECT_ID}
+      - OLLAMA_BASE_URL=http://ollama:11434
+      - OLLAMA_MODEL=${OLLAMA_MODEL:-llama3.2}
+    volumes:
+      - ${GCS_KEY_FILENAME:-/dev/null}:/secrets/gcs-key.json:ro
+      - attachment-temp:/tmp/attachments
+    depends_on:
+      - ollama
+      - redis
+    networks:
+      - attachment-summarizer
+
+  ollama:
+    image: ollama/ollama:latest
+    ports:
+      - "11434:11434"
+    volumes:
+      - ollama-data:/root/.ollama
+    networks:
+      - attachment-summarizer
+    # Pull model on first start
+    entrypoint: >
+      sh -c "ollama serve & sleep 5 && ollama pull ${OLLAMA_MODEL:-llama3.2} && wait"
+
+  redis:
+    image: redis:7-alpine
+    ports:
+      - "6379:6379"
+    volumes:
+      - redis-data:/data
+    networks:
+      - attachment-summarizer
+
+networks:
+  attachment-summarizer:
+    driver: bridge
+
+volumes:
+  ollama-data:
+  redis-data:
+  attachment-temp:
--- /dev/null
+++ services/attachment-summarizer/jest.config.js
@@ -0,0 +1,18 @@
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
--- /dev/null
+++ services/attachment-summarizer/package.json
@@ -0,0 +1,62 @@
+{
+  "name": "attachment-summarizer",
+