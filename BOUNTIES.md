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

This document tracks active and completed bounties for the warpSpeed project.

## Active Bounties

### Email Threads API — $750 (Hard)

| Field | Details |
|-------|---------|
| **Bounty ID** | WARP-2024-001 |
| **Status** | Open — accepting claims |
| **Reward** | $750 USD |
| **Difficulty** | Hard |
| **Skills** | Node.js, TypeScript, Prisma, API Development, Email Systems, Jest, Swagger |

#### Description

Build a thread-first Email Threads API for the warpSpeed app. This bounty introduces a new threaded email experience so users can work with conversations instead of isolated messages.

#### Technical Requirements

##### 1. Thread Listing Endpoint
- `GET /api/v1/email-threads`
- Returns paginated list of email threads for the authenticated user
- Supports filtering by: account, label, date range, unread status, has-attachments
- Supports sorting by: most recent activity (default), oldest first, thread size
- Response includes: thread ID, subject, participant list, message count, unread count, last activity timestamp, preview snippet

##### 2. Thread Detail Endpoint
- `GET /api/v1/email-threads/:id`
- Returns thread metadata + all related messages in chronological order
- Includes draft messages in their correct position within the conversation
- Excludes archived and deleted messages unless explicitly requested
- Response includes full participant list with display names and email addresses

##### 3. Thread-Aware Search & Filtering
- `GET /api/v1/email-threads/search`
- Groups search results by thread
- Maintains consistent search behavior with existing `/messages` search endpoint
- Supports full-text search across subject, body, and participant names
- Supports filter combination: date range, has-attachments, participants, labels

##### 4. Draft Integration
- Drafts are created/updated within the correct thread context
- Thread recency updates when drafts are created, updated, or sent
- Unsent drafts appear in thread detail with appropriate status indicator
- Draft deletion removes from thread without affecting other messages

##### 5. Sync Integration
- Gmail, Outlook, and IMAP synced emails correctly update thread ordering
- Thread grouping matches provider-native thread behavior where possible
- Handles edge cases: split threads, merged threads, thread ID changes

##### 6. Access Control
- Respects existing ownership and access control rules
- Users can only access threads for accounts they own or have shared access to
- Team/shared mailbox threads follow existing permission model

#### API Specification

##### Data Models


Payment happens after the PR is approved and merged.
