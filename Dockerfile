FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./
COPY src/ ./src/

# Install dependencies
RUN npm install

# Install Ollama
RUN apk add curl
RUN curl -O https://ollama.ai/install.sh
RUN sh install.sh

# Expose port
EXPOSE 3000

# Create non-root user
RUN addgroup -g 1001 -S node && adduser -S node -u 1001
USER node

# Build and start the application
RUN npm run build
CMD ["node", "dist/index.js"]