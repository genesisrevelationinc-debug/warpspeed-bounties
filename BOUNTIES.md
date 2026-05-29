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

# Attachment Summarizer Service

## Overview

This service processes email attachments by consuming events from AWS SQS, downloading from Google Cloud Storage, and generating AI-powered summaries using a self-hosted LLM.

## Features

- Real-time processing of SQS events
- Support for multiple file types (PDF, DOCX, XLSX, TXT, HTML, images)
- Secure GCS integration
- Containerized with Docker
- Comprehensive logging and error handling
- Unit and integration tests included

## Technical Requirements

### 1. AWS SQS Integration
- Consume messages from a dedicated SQS queue containing attachment metadata
- Process messages with full error handling and retry logic

### 2. Google Cloud Storage Support
- Download files using GCS client library
- Handle authentication via service account

### 3. File Processing
- Support the following file types:
  - PDF
  - DOC/DOCX
  - XLS/XLSX
  - Plain text
  - HTML
  - Images (PNG, JPG, GIF)

### 4. Summary Generation
- Use Ollama or Hugging Face Transformers
- Summarize content in natural language
- Support custom summarization prompts

### 5. Output and Storage
- Save summaries to database with Prisma
- Log all operations with Winston
- Handle failures gracefully

## Architecture


Payment happens after the PR is approved and merged.
