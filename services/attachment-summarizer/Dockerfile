# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci

# Generate Prisma client
RUN npx prisma generate

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Install runtime dependencies for file processing
RUN apk add --no-cache \
    libreoffice \
    poppler-utils \
    tesseract-ocr \
    tesseract-ocr-data-eng \
    && rm -rf /var/cache/apk/*

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install production dependencies only
RUN npm ci --only=production && \
    npx prisma generate

# Copy built application from builder
COPY --from=builder /app/dist ./dist

# Create temp directories
RUN mkdir -p tmp uploads downloads

EXPOSE 3000

CMD ["node", "dist/index.js"]