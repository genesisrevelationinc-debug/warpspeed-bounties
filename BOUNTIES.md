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

# warpSpeed Bounties

## Attachment Summarizer Service - $960

### Overview

Build a Node.js attachment summarizer service that consumes email attachment events from AWS SQS, downloads attachments from Google Cloud Storage, extracts content from supported file types, and generates natural-language summaries using a self-hosted open-source LLM.

### Technical Requirements

1. Service must be implemented in Node.js with TypeScript
2. Use Prisma for database operations if needed
3. Consume messages from AWS SQS queue
4. Download attachments from Google Cloud Storage
5. Support file types:
   - PDF files
   - Microsoft Word documents (.doc, .docx)
   - Text files (.txt)
   - HTML files
   - Image files with OCR capability
6. Extract content from attachments using appropriate libraries
7. Generate summaries using a locally hosted LLM (Ollama/LLMContainer)
8. Implement proper error handling and logging
9. Containerize service with Docker
10. Include comprehensive test coverage

### Acceptance Criteria

- Service can successfully consume SQS messages with attachment metadata
- Service can download files from GCS using provided credentials
- Service can extract text content from supported file types
- Service can successfully generate summaries using the LLM
- Generated summaries are saved to the database
- Errors are properly logged and handled
- Dockerfile is provided for containerization
- Service handles edge cases (network issues, file corruption, etc.)
- 80%+ test coverage on business logic

### Additional Notes

- All code must be properly typed with TypeScript
- Follow clean code principles and separation of concerns
- Document any external dependencies
Payment happens after the PR is approved and merged.
