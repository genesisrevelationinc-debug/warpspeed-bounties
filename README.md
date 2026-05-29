# warpSpeed Attachment Summarizer Service

## Overview
The Attachment Summarizer Service processes email attachments by:
- Consuming events from AWS SQS
- Downloading attachments from Google Cloud Storage
- Extracting content from file types (PDF, DOC, XLS, etc.)
- Generating AI-powered summaries using a self-hosted LLM
- Storing results in a PostgreSQL database via Prisma

## Features
- **Multi-format support**: PDF, DOCX, XLSX, TXT, HTML, images
- **Error resilience**: Automatic retries and dead-letter handling
- **Container-ready**: Dockerized service for easy deployment
- **Scalable**: Designed for high-throughput attachment processing

## Technical Stack
- [Ollama](https://ollama.ai/) for local LLM inference
- [AWS SQS](https://aws.amazon.com/sqs/) for event queuing
- [Google Cloud Storage](https://cloud.google.com/storage) for file storage
- [Prisma](https://www.prisma.io/) for database ORM
- [Docker](https://www.docker.com/) for containerization

## Getting Started



Paid open-source bounty tasks for developers contributing to **warpSpeed OPEN**.

Developers can browse open bounties, sign up on the website, claim a GitHub issue, submit a pull request, and receive payment after the PR is approved and merged.

## Quick Links

- Website: https://warpspeedopen.org
- Bounties: https://warpspeedopen.org/bounties
- Developer Signup: https://warpspeedopen.org/signup
- Discord: Add Discord invite link here
- Community Repo: Add `warpspeed-community` repo link here

## How the bounty process works

1. Browse available bounty tasks.
2. Sign up on the warpSpeed OPEN website.
3. Comment on the GitHub bounty issue to request assignment.
4. Wait for maintainer confirmation before starting paid work.
5. Fork the repository and create your branch.
6. Submit your pull request.
7. Respond to review comments.
8. Get paid after the PR is approved and merged.

## Bounty categories

- Frontend UI
- React Native
- Node.js API
- Prisma / database work
- TypeScript
- AI productivity features
- Documentation
- Integrations

## Important payment rule

Bounties are paid only after the work is approved and the pull request is merged.

