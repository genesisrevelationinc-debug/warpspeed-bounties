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

## [PAID BOUNTY - $750] Email Threads API

**Status:** Open for claims  
**Reward:** $750  
**Difficulty:** Hard  
**Labels:** help wanted, bounty, expert, paid, open, nodejs, prisma, typescript, backend, API

### Overview

Build a thread-first Email Threads API for the warpSpeed app. This bounty introduces a new threaded email experience so users can work with conversations instead of isolated messages.

### Technical Requirements

#### API Endpoints

1. **List Email Threads** - `GET /api/v1/email-threads`
   - Return paginated list of email threads for the authenticated user
   - Support filtering by: date range, participants, labels, has attachments, is unread
   - Support sorting by: most recent activity, thread start date, participant count, message count
   - Include thread metadata: subject, participants, message count, unread count, last activity date
   - Default sort: most recent activity first

2. **Get Thread Detail** - `GET /api/v1/email-threads/:id`
   - Return thread metadata with all related messages ordered by date
   - Include draft messages in their correct chronological position
   - Return participant list with email addresses and display names
   - Include attachment metadata for each message
   - Support `?includeDeleted=true` query param for trash folder view

3. **Update Thread** - `PATCH /api/v1/email-threads/:id`
   - Update thread-level properties: isArchived, isRead, labels assignments
   - Bulk update read status for all messages in thread
   - Validate ownership and access control

#### Data Model Requirements


Payment happens after the PR is approved and merged.
