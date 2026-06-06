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

Paid open-source bounty tasks for developers contributing to **warpSpeed OPEN**.

## Available Bounties

### Attachment Summarizer Service - $960

Build a Node.js attachment summarizer service that consumes email attachment events from AWS SQS, downloads attachments from Google Cloud Storage, extracts content from supported file types, and generates natural-language summaries using a self-hosted open-source LLM.

#### Reward

$960

#### Difficulty

Expert

#### Main Skills

- Node.js
- TypeScript
- Prisma
- AWS SQS
- Google Cloud Storage
- Docker
- Ollama / Open-source LLMs

#### High-Level Scope

The selected developer will build a service that:

- Consumes attachment events from SQS
- Downloads attachments from GCS
- Handles common attachment types such as PDFs, Word documents, spreadsheets, text files, HTML, and images
- Generates short factual summaries using a locally hosted LLM
- Includes error handling, logging, Docker setup, and tests

#### Technical Requirements

1. **Service Architecture**
   - Build a Node.js service using TypeScript
   - Use Prisma for any database interactions if needed
   - Design for deployment in containerized environments (Docker)

2. **Event Consumption**
   - Poll AWS SQS for attachment events
   - Process messages with appropriate error handling and dead-letter queues
   - Acknowledge messages only after successful processing

3. **File Handling**
   - Download attachments from Google Cloud Storage using provided credentials
   - Support common file types:
     - PDF (.pdf)
     - Word Documents (.doc, .docx)
     - Spreadsheets (.xls, .xlsx, .csv)
     - Text files (.txt, .rtf)
     - HTML (.html, .htm)
     - Images (.jpg, .jpeg, .png, .tiff, .bmp)
   - Extract text content from each supported file type

4. **Content Summarization**
   - Use a self-hosted open-source LLM (e.g., LLaMA, Mistral) via Ollama or similar
   - Generate concise, factual summaries (1-3 sentences) of attachment content
   - Handle summarization failures gracefully

5. **Error Handling & Logging**
   - Implement comprehensive error handling for all components
   - Log significant events and errors with appropriate severity levels
   - Include correlation IDs to track request flows

6. **Testing**
   - Unit tests for core functionality (file handling, summarization)
   - Integration tests for SQS and GCS integrations
   - Error case simulations

7. **Configuration & Security**
   - Use environment variables for configuration
   - Never commit credentials to the repository
   - Follow security best practices for cloud service access

8. **Docker Support**
   - Provide a complete Dockerfile for the service
   - Include docker-compose for local testing if applicable

#### Submission Requirements

- All code must be original or properly licensed
- Follow the repository's coding standards
- Include documentation for setup and running
- Pass all automated and manual review processes

#### How to Claim

1. Visit [warpSpeed OPEN](https://warpspeedopen.org) and sign up as a developer
2. Review the full bounty specification
3. Return to the GitHub issue and comment: "I have signed up and would like to claim this bounty."
4. Wait for maintainer confirmation before beginning work
Payment happens after the PR is approved and merged.
