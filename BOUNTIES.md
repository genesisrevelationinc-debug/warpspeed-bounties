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

Paid open-source bounty tasks for developers contributing to **wpspeed OPEN**.

## Available Bounties

### [PAID BOUNTY - $960] Attachment Summarizer Service

#### Bounty Overview

Build a Node.js attachment summarizer service that consumes email attachment events from AWS SQS, downloads attachments from Google Cloud Storage, extracts content from supported file types, and generates natural-language summaries using a self-hosted open-source LLM.

This bounty is part of the warpSpeed OPEN developer bounty programme.

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
   - Use Prisma for any database interactions
   - Dockerize the service for easy deployment

2. **SQS Integration**
   - Consume messages from AWS SQS queue
   - Handle message deletion after successful processing
   - Implement proper error handling for failed messages

3. **GCS Integration**
   - Download attachments from Google Cloud Storage
   - Handle authentication with service account credentials
   - Implement retry logic for failed downloads

4. **Content Extraction**
   - Support for PDF files
   - Support for Microsoft Word documents (.doc, .docx)
   - Support for Microsoft Excel spreadsheets (.xls, .xlsx)
   - Support for plain text files (.txt)
   - Support for HTML files (.html, .htm)
   - Support for image files (.jpg, .png, .gif) with OCR capabilities

5. **LLM Integration**
   - Use a self-hosted open-source LLM (e.g., LLaMA, Mistral)
   - Integrate with Ollama or similar local LLM service
   - Generate concise, factual summaries (50-100 words)
   - Handle LLM API failures gracefully

6. **Error Handling & Logging**
   - Comprehensive error handling for all components
   - Structured logging for debugging and monitoring
   - Dead letter queue implementation for failed messages

7. **Testing**
   - Unit tests for core functionality
   - Integration tests for SQS and GCS integrations
   - Mock LLM responses for testing

8. **Documentation**
   - README with setup instructions
   - Configuration documentation
   - Deployment guide

#### Submission Rules

1. Fork the repository and create your branch
2. Implement the solution following the technical requirements
3. Include comprehensive tests
4. Document the setup and usage
5. Submit a pull request with your implementation

#### Acceptance Criteria

- Service successfully consumes SQS messages
- Attachments are downloaded from GCS
- Content is extracted from all supported file types
- Summaries are generated using the LLM
- Error handling is implemented throughout
- Code is well-documented and tested
- Docker setup is provided
- All technical requirements are met

#### How to Claim

1. Open the bounty page at https://warpspeedopen.org/bounties
2. Sign up as a developer
3. Return to this GitHub issue and comment:

   "I have signed up and would like to claim this bounty."

4. A maintainer must confirm before work begins

#### Important Rules

- Do not start work until a maintainer confirms your claim
- Maximum 3 submission attempts
- Payment is made only after the pull request is approved and merged
- Code must be original or properly licensed
- The full bounty page is the source of truth for technical requirements and deadlines

#### View Full Bounty Details & Sign Up

To see the full bounty specification and apply, visit:

https://warpspeedopen.org/bounties
Payment happens after the PR is approved and merged.
