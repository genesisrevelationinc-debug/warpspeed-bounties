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

## Active Bounties

### [PAID BOUNTY - $960] Attachment Summarizer Service

- **Status**: Open
- **Reward**: $960
- **Difficulty**: Expert
- **Labels**: `help wanted`, `bounty`, `expert`, `paid`, `open`, `nodejs`, `prisma`, `typescript`, `backend`

#### Overview

Build a Node.js attachment summarizer service that consumes email attachment events from AWS SQS, downloads attachments from Google Cloud Storage, extracts content from supported file types, and generates natural-language summaries using a self-hosted open-source LLM.

#### Technical Requirements

- **Runtime**: Node.js with TypeScript
- **Database**: Prisma ORM
- **Queue**: AWS SQS for event consumption
- **Storage**: Google Cloud Storage for attachment downloads
- **LLM**: Self-hosted open-source model via Ollama
- **Containerization**: Docker
- **Testing**: Comprehensive test suite

#### Supported File Types

- PDF documents
- Microsoft Word (.doc, .docx)
- Spreadsheets (.xls, .xlsx, .csv)
- Plain text files (.txt)
- HTML files
- Images (with OCR capability)

#### Core Functionality

1. **SQS Consumer**: Poll AWS SQS queue for attachment events
2. **GCS Downloader**: Download attachments from Google Cloud Storage
3. **Content Extraction**: Extract text content from supported file types
4. **Summary Generation**: Generate factual summaries using local LLM
5. **Error Handling**: Robust error handling and retry logic
6. **Logging**: Structured logging throughout the pipeline
7. **Persistence**: Store summary results via Prisma ORM

#### Infrastructure

- Docker and docker-compose setup
- Ollama service for LLM inference
- Health checks and monitoring endpoints

#### How to Claim

1. Visit [warpSpeed OPEN Bounties](https://warpspeedopen.org/bounties)
2. Sign up as a developer
3. Comment on the GitHub issue: *"I have signed up and would like to claim this bounty."*
4. Wait for maintainer confirmation before starting work

#### Important Rules

- Do not start work until a maintainer confirms your claim
- Maximum 3 submission attempts
- Payment is made only after the pull request is approved and merged
- Code must be original or properly licensed
- The full bounty page is the source of truth for technical requirements and deadlines

---

*For questions, join our [Discord](https://warpspeedopen.org/discord) or email bounties@warpspeedopen.org*
Payment happens after the PR is approved and merged.
