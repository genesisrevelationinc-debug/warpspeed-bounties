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

This document tracks active, claimed, and completed bounty tasks for the warpSpeed OPEN developer programme.

## Active Bounties

| ID | Title | Reward | Difficulty | Status |
|----|-------|--------|------------|--------|
| B-001 | Email Threads API | $750 | Hard | Open |

## Bounty Details

### B-001: Email Threads API

**Reward:** $750
**Difficulty:** Hard
**Skills:** Node.js, TypeScript, Prisma, API Development, Email Systems, Jest Testing, Swagger / API Documentation

#### Description

Build a thread-first Email Threads API for the warpSpeed app. This bounty introduces a new threaded email experience so users can work with conversations instead of isolated messages.

#### Requirements

- **List Email Threads**: API endpoint to list email threads for the authenticated user with pagination, sorting by recency, and filtering by read/unread status.
- **Open Thread**: API endpoint to retrieve a single thread with its metadata and all related messages in chronological order.
- **Search & Filter Integration**: Group filtered and search results by thread rather than returning isolated messages.
- **Ownership & Access Control**: Preserve existing ownership and access control rules; users must only see threads they own or have access to.
- **Draft Handling**: Include drafts in the correct conversation thread; update thread recency when drafts are created, updated, or sent.
- **Archive/Delete Exclusion**: Exclude archived and deleted messages from thread listings and search results where required.
- **Sync Integration**: Ensure synced Gmail, Outlook, and IMAP emails update thread ordering correctly upon sync.
- **Consistent API**: Maintain consistent search and filtering behaviour with the existing messages endpoint.
- **Documentation**: Add Swagger/OpenAPI documentation for all new endpoints.
- **Testing**: Add Jest tests covering authentication, ordering, filters, drafts, and thread detail behaviour.

#### API Endpoints (Planned)


Payment happens after the PR is approved and merged.
