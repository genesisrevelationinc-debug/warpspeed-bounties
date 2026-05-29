```diff
--- /dev/null
+++ b/docker-compose.yml
@@ -0,0 +1,67 @@
+version: '3.8'
+
+services:
+  app:
+    build:
+      context: .
+      dockerfile: Dockerfile
+    container_name: attachment-summarizer
+    ports:
+      - "3000:3000"
+    environment:
+      - NODE_ENV=production
+      - PORT=3000
+      - AWS_REGION=${AWS_REGION:-us-east-1}
+      - AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
+      - AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
+      - SQS_QUEUE_URL=${SQS_QUEUE_URL}
+      - GCS_BUCKET_NAME=${GCS_BUCKET_NAME}
+      - GOOGLE_APPLICATION_CREDENTIALS=/app/secrets/gcs-key.json
+      - OLLAMA_HOST=http://ollama:11434
+      - DATABASE_URL=${DATABASE_URL}
+      - LLM_MODEL=${LLM_MODEL:-llama2}
+    volumes:
+      - ./secrets:/app/secrets:ro
+    depends_on:
+      ollama:
+        condition: service_healthy
+      db:
+        condition: service_healthy
+    networks:
+      - app-network
+
+  ollama:
+    image: ollama/ollama:latest
+    container_name: ollama
+    volumes:
+      - ollama-data:/root/.ollama
+    ports:
+      - "11434:11434"
+    healthcheck:
+      test: ["CMD", "curl", "-f", "http://localhost:11434/api/tags"]
+      interval: 30s
+      timeout: 10s
+      retries: 5
+    networks:
+      - app-network
+
+  db:
+    image: postgres:15-alpine
+    container_name: postgres
+    environment:
+      - POSTGRES_USER=postgres
+      - POSTGRES_PASSWORD=postgres
+      - POSTGRES_DB=attachment_summarizer
+    volumes:
+      - postgres-data:/var/lib/postgresql/data
+    ports:
+      - "5432:5432"
+    healthcheck:
+      test: ["CMD-SHELL", "pg_isready -U postgres"]
+      interval: 10s
+      timeout: 5s
+      retries: 5
+    networks:
+      - app-network
+
+volumes:
+  ollama-data:
+  postgres-data:
+
+networks:
+  app-network:
+    driver: bridge
--- /dev/null
+++ b/Dockerfile
@@ -0,0 +1,38 @@
+# Build stage
+FROM node:18-alpine AS builder
+
+WORKDIR /app
+
+# Install dependencies first (better caching)
+COPY package*.json ./
+COPY prisma ./prisma/
+
+RUN npm ci
+
+# Generate Prisma client
+RUN npx prisma generate
+
+# Copy source and build
+COPY . .
+RUN npm run build
+
+# Production stage
+FROM node:18-alpine AS production
+
+WORKDIR /app
+
+# Install production dependencies
+COPY package*.json ./
+COPY prisma ./prisma/
+RUN npm ci --only=production && npx prisma generate
+
+# Copy built files from builder
+COPY --from=builder /app/dist ./dist
+
+# Create non-root user for security
+RUN addgroup -g 1001 -S nodejs && \
+    adduser -S nodejs -u 1001
+
+USER nodejs
+
+EXPOSE 3000
+
+CMD ["node", "dist/main.js"]
--- /dev/null
+++ b/package.json
@@ -0,0 +1,62 @@
+{
+  "name": "attachment-summarizer-service",
+  "version": "1.0.0",
+  "description": "Node.js service that consumes email attachment events from SQS, downloads attachments from GCS, and generates summaries using a self-hosted LLM",
+  "main": "dist/main.js",
+  "scripts": {
+    "build": "tsc",
+    "start": "node dist/main.js",
+    "dev": "ts-node-dev --respawn --transpile-only src/main.ts",
+    "test": "jest",
+    "test:watch": "jest --watch",
+    "test:coverage": "jest --coverage",
+    "lint": "eslint src/**/*.ts",
+    "lint:fix": "eslint src/**/*.ts --fix",
+    "prisma:generate": "prisma generate",
+    "prisma:migrate": "prisma migrate dev",
+    "prisma:studio": "prisma studio",
+    "prisma:seed": "ts-node prisma/seed.ts"
+  },
+  "keywords": [
+    "attachment-summarizer",
+    "sqs",
+    "gcs",
+    "llm",
+    "ollama",
+    "nodejs",
+    "typescript"
+  ],
+  "author": "",
+  "license": "MIT",
+  "dependencies": {
+    "@aws-sdk/client-sqs": "^3.450.0",
+    "@google-cloud/storage": "^7.6.0",
+    "@prisma/client": "^5.6.0",
+    "dotenv": "^16.3.1",
+    "mammoth": "^1.6.0",
+    "pdf-parse": "^1.1.1",
+    "pino": "^8.16.2",
+    "pino-pretty": "^10.2.3",
+    "xlsx": "^0.18.5"
+  },
+  "devDependencies": {
+    "@types/jest": "^29.5.8",
+    "@types/node": "^20.9.0",
+    "@types/pdf-parse": "^1.1.4",
+    "@typescript-eslint/eslint-plugin": "^6.12.0",
+    "@typescript-eslint/parser": "^6.12.0",
+    "eslint": "^8.54.0",
+    "jest": "^29.7.0",
+    "prisma": "^5.6.0",
+    "ts-jest": "^29.1.1",
+    "ts-node": "^10.9.1",
+    "ts-node-dev": "^2.0.0",
+    "typescript": "^5.3.2"
+  },
+  "engines": {
+    "node": ">=18.0.0"
+  }
+}
--- /dev/null
+++ b/tsconfig.json
@@ -0,0 +1,24 @@
+{
+  "compilerOptions": {
+    "target": "ES202