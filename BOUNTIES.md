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

This document tracks active and completed bounty tasks for the warpSpeed OPEN developer programme.

## Active Bounties

### Email Threads API — $750

| Field | Details |
|-------|---------|
| **Status** | Open — accepting claims |
| **Difficulty** | Hard |
| **Skills** | Node.js, TypeScript, Prisma, API Development, Email Systems, Jest, Swagger |
| **Issue** | [#1](https://github.com/warpspeedopen-source/warpspeed-bounties/issues/1) |

#### Description

Build a thread-first Email Threads API for the warpSpeed app. This bounty introduces a new threaded email experience so users can work with conversations instead of isolated messages.

#### Technical Requirements

##### Core Endpoints

- `GET /api/v1/email-threads` — List email threads for the authenticated user
  - Support pagination (`page`, `limit`)
  - Support filtering by `accountId`, `label`, `isRead`, `isStarred`
  - Support search by `q` (subject, participant names, preview text)
  - Support sorting by `lastMessageAt` (default, desc) or `createdAt`
  - Return thread metadata: id, subject, participants, messageCount, unreadCount, lastMessageAt, preview, isRead, isStarred, hasDrafts

- `GET /api/v1/email-threads/:id` — Open a single thread
  - Return thread metadata with all related messages ordered by `sentAt` ascending
  - Include draft messages in their correct chronological position
  - Exclude archived and deleted messages unless explicitly requested (`?includeArchived=true`, `?includeDeleted=true`)
  - Mark thread as read for the requesting user (optional, controlled by `?markAsRead=true`)

- `POST /api/v1/email-threads/:id/drafts` — Create or update a draft within a thread
  - Update thread `lastMessageAt` to draft's `updatedAt`
  - Ensure draft appears in thread message list

- `POST /api/v1/email-threads/:id/send` — Send a draft from within a thread
  - Move message from draft to sent status
  - Update thread `lastMessageAt` to sent timestamp

##### Data Model (Prisma)


Payment happens after the PR is approved and merged.
