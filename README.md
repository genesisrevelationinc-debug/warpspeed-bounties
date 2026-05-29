# warpSpeed Attachment Summarizer Service

## Overview

This service processes email attachment events by consuming messages from AWS SQS, downloading attachments from Google Cloud Storage, extracting content from various file types, and generating summaries using a self-hosted LLM.

## Features

- **SQS Integration**: Consumes messages from an AWS SQS queue.
- **GCS Integration**: Downloads attachments from Google Cloud Storage.
- **File Processing**: Extracts text from PDFs, Word documents, spreadsheets, and more.
- **LLM Summarization**: Generates concise summaries using a local LLM.
- **Error Handling**: Robust error handling and logging.
- **Docker Support**: Containerized service for easy deployment.

## Technical Requirements

1. Set up an AWS SQS queue for receiving attachment processing events.
2. Configure Google Cloud Storage access for downloading attachments.
3. Implement content extraction for:
   - PDF files
   - Microsoft Word documents (.doc, .docx)
   - Microsoft Excel spreadsheets (.xls, .xlsx)
   - Plain text files (.txt)
   - HTML files (.html, .htm)
   - Image files with OCR support (.jpg, .png, .gif, .bmp, .tiff, .svg)
4. Use Ollama with a local LLM (e.g., Mistral) for generating summaries.
5. Implement comprehensive logging and error handling.
6. Dockerize the service for deployment.

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- Docker
- AWS CLI configured with appropriate credentials
- Google Cloud SDK configured with appropriate credentials
- Ollama installed and running

### Installation


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

