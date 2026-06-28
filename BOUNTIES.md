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

# Active Bounties

This document lists currently active bounties in the warpSpeed OPEN bounty programme.

## Current Open Bounties

### [PAID BOUNTY - $960] Attachment Summarizer Service

| Field | Details |
|-------|---------|
| **Issue** | [#1](https://github.com/warpspeedopen-source/warpspeed-bounties/issues/1) |
| **Reward** | $960 |
| **Difficulty** | Expert |
| **Status** | 🟢 Open - Awaiting Claim |

### Description

Build a Node.js attachment summarizer service that consumes email attachment events from AWS SQS, downloads attachments from Google Cloud Storage, extracts content from supported file types, and generates natural-language summaries using a self-hosted open-source LLM.

### Technical Stack

- **Runtime**: Node.js (v18+)
- **Language**: TypeScript
- **ORM**: Prisma
- **Message Queue**: AWS SQS
- **Storage**: Google Cloud Storage (GCS)
- **Containerization**: Docker
- **LLM**: Ollama / Open-source LLMs (e.g., Llama 2, Mistral)

### Requirements

#### Core Functionality
1. **SQS Consumer**: Poll AWS SQS queue for attachment events
2. **GCS Download**: Download attachments from Google Cloud Storage
3. **Content Extraction**: Support for:
   - PDF documents
   - Microsoft Word (.doc, .docx)
   - Spreadsheets (.xls, .xlsx, .csv)
   - Plain text files (.txt)
   - HTML documents
   - Images (with OCR for text extraction)
4. **LLM Summarization**: Generate concise, factual summaries using locally hosted LLM
5. **Result Storage**: Store summaries and metadata in database via Prisma

#### Non-Functional Requirements
- Comprehensive error handling and retry logic
- Structured logging (Winston or similar)
- Docker and docker-compose setup
- Unit and integration tests (Jest)
- Environment-based configuration
- Health check endpoints

### Acceptance Criteria

- [ ] Service successfully consumes SQS messages
- [ ] All listed file types can be processed
- [ ] Summaries are generated with acceptable quality
- [ ] Error cases are handled gracefully with dead-letter queue support
- [ ] Test coverage > 80%
- [ ] Docker setup works with `docker-compose up`
- [ ] Documentation includes setup and usage instructions

### How to Claim

1. Visit [warpSpeed OPEN Bounties](https://warpspeedopen.org/bounties)
2. Sign up as a developer
3. Review full technical requirements
4. Comment on the GitHub issue: *"I have signed up and would like to claim this bounty."*

### Important Rules

- ⛔ Do not start work until a maintainer confirms your claim
- Maximum 3 submission attempts
- Payment only after PR approval and merge
- Code must be original or properly licensed

---

*Last updated: 2024*
Payment happens after the PR is approved and merged.
