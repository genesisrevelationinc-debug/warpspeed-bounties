# warpSpeed Attachment Summarizer Service

## Overview

This document outlines the requirements for building a Node.js attachment summarizer service that:

- Consumes email attachment events from AWS SQS
- Downloads attachments from Google Cloud Storage
- Extracts content from common file types (PDFs, Word docs, etc.)
- Generates natural-language summaries using a self-hosted LLM
- Stores results in a database using Prisma

## Technical Requirements

### Core Functionality

- **SQS Queue Consumption**: The service must connect to an AWS SQS queue to receive attachment processing events.
- **GCS Download**: Upon receiving an SQS message, the service downloads the corresponding file from Google Cloud Storage.
- **Content Extraction**: Extract content from:
  - PDF files (via `pdf-parse` or similar)
  - DOCX files (via `mammoth` or similar)
  - Plain text files
  - HTML content
  - Images (OCR via `tesseract` or similar)
- **Summarization**:
  - Use a self-hosted LLM (e.g., Llama 2 via Ollama) to generate concise, natural-language summaries.
  - Summaries should be returned in English, max 3-5 sentences.
- **Storage**:
  - Use Prisma ORM to store summary results in a PostgreSQL or MySQL database.
  - Include fields: `id`, `emailId`, `summary`, `attachmentName`, `processedAt`

## Setup Instructions

### Prerequisites

- Node.js >= 18.x
- Docker & Docker Compose
- Google Cloud SDK configured
- AWS CLI configured with SQS access
- PostgreSQL (or compatible DB) instance

### Environment Variables

The service requires the following environment variables:


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

Payment happens after the PR is approved and merged.
