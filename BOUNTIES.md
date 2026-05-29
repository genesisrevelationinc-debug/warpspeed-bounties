## PAID BOUNTY - $960: Attachment Summarizer Service

### Bounty Overview

Build a Node.js attachment summarizer service that consumes email attachment events from AWS SQS, downloads attachments from Google Cloud Storage, extracts content from supported file types, and generates natural-language summaries using a self-hosted open-source LLM.

### Reward

$960

### Difficulty

Expert

### Main Skills

- Node.js
- TypeScript
- Prisma
- AWS SQS
- Google Cloud Storage
- Docker
- Ollama / Open-source LLMs

## Technical Requirements

The service must:

- Consume attachment events from AWS SQS
- Download attachments from Google Cloud Storage
- Handle common attachment types (PDF, Word, spreadsheets, text files, HTML, images)
- Generate summaries using a self-hosted open-source LLM
- Include error handling, logging, and Docker setup
- Include tests for all functionality

## Architecture

The service should follow a modular architecture with the following components:

1. **SQS Consumer Service** - Polls AWS SQS for messages
2. **GCS Download Service** - Downloads attachments from Google Cloud Storage
3. **Document Processing Service** - Processes different file types
4. **LLM Service** - Interfaces with the self-hosted LLM for summarization
5. **Error Handling & Logging Service** - Handles errors and logs activities
6. **Docker Service** - Containerizes the application
7. **Test Service** - Implements tests for all core functionality

## Implementation Plan

### 1. Project Structure


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

Payment happens after the PR is approved and merged.
