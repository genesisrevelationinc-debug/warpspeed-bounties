# Open Bounties

This file lists the bounty tasks currently visible on the warpSpeed OPEN bounty page.

| Bounty | Reward | Difficulty | Stack | Status | Signup Capacity | Timeline | Estimated Duration |
|---|---:|---|---|---|---|---|---|
| Attachment Summarizer Service | $960 | Expert | Node.js, Prisma, TypeScript | Open | 66% full | 5/11/2026 – 6/11/2026 | 32h with AI / 80h unassisted |
| Email inbox (classic view) page UI | $330 | Medium | React Native, TypeScript | Open | 100% full | 4/25/2026 – 5/30/2026 | 6h with AI / 6h unassisted |
| Messenger Group Chat Poll Creation & Voting UI | $440 | Medium | React Native, TypeScript | Open | 66% full | 4/24/2026 – 5/29/2026 | 8h with AI / 8h unassisted |
| Email Threads API | $750 | Hard | Node.js, Prisma, TypeScript | Open | 50% full | 4/26/2026 – 5/26/2026 | 28h with AI / 68h unassisted |
| Inline image editing | $660 | Medium | TypeScript, React Native | Open | 100% full | 12/12/2025 – 3/19/2026 | 12h with AI / 12h unassisted |
| Enhanced image preview | $660 | Medium | TypeScript, React Native | Open | 100% full | 12/12/2025 – 3/17/2026 | 12h with AI / 12h unassisted |
| Note Locking (Biometrics/PIN) | $660 | Medium | TypeScript, React Native | Open | 66% full | 12/8/2025 – 3/18/2026 | 12h with AI / 12h unassisted |
| Audio note recording | $750 | Hard | TypeScript, React Native | Open | 100% full | 12/12/2025 – 3/18/2026 | 8h with AI / 8h unassisted |

## How to claim

1. Open the relevant bounty issue.
2. Sign up as a developer: https://warpspeedopen.org/signup
3. Comment on the issue saying you want to claim it.
4. Wait for maintainer approval before starting paid work.

## Payment condition

# warpSpeed OPEN Bounties

This document lists all available bounties in the warpSpeed OPEN programme.

## Active Bounties

### Attachment Summarizer Service - $960

**Difficulty**: Expert  
**Main Skills**: Node.js, TypeScript, Prisma, AWS SQS, Google Cloud Storage, Docker, Ollama / Open-source LLMs

Build a Node.js attachment summarizer service that consumes email attachment events from AWS SQS, downloads attachments from Google Cloud Storage, extracts content from supported file types, and generates natural-language summaries using a self-hosted open-source LLM.

#### Requirements

1. **Service Architecture**
   - Build as a standalone Node.js service
   - Use TypeScript for type safety
   - Containerize with Docker
   - Follow 12-factor app principles

2. **SQS Integration**
   - Consume messages from AWS SQS queue
   - Handle attachment event schema properly
   - Implement proper error handling and retries
   - Delete messages after successful processing

3. **Google Cloud Storage Integration**
   - Download attachments using provided GCS URLs
   - Handle authentication with service account keys
   - Support for common file types (PDF, DOCX, XLSX, TXT, HTML, images)

4. **Content Extraction**
   - Extract text content from file types:
     - PDF documents
     - Microsoft Word (.docx)
     - Microsoft Excel (.xlsx)
     - Plain text files (.txt)
     - HTML files
     - Images (with OCR capability)
   - Handle corrupted or password-protected files gracefully

5. **LLM Integration**
   - Use a self-hosted open-source LLM (e.g., Llama)
   - Integrate with Ollama or similar local LLM service
   - Generate concise, factual summaries
   - Handle LLM errors and timeouts

6. **Data Persistence**
   - Use Prisma ORM for database operations
   - Store summary results with metadata
   - Update original attachment records with summaries

7. **Error Handling & Logging**
   - Comprehensive error handling for all operations
   - Structured logging (Winston or Pino)
   - Dead letter queue pattern for failed messages
   - Graceful degradation for partial failures

8. **Testing**
   - Unit tests for core logic
   - Integration tests for external services
   - Mock services for testing
   - Test coverage >80%

9. **Documentation**
   - Inline code comments
   - README with setup instructions
   - Docker build and run instructions
   - Environment variable documentation

10. **Deployment**
    - Docker Compose setup
    - Environment-based configuration
    - Health check endpoints
    - Graceful shutdown handling

#### Technical Specifications

- **Environment Variables**
  
Payment happens after the PR is approved and merged.
