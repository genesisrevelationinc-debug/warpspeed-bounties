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

- **Status**: Open
- **Reward**: $750
- **Difficulty**: Hard
- **Labels**: help wanted, bounty, expert, paid, open, nodejs, prisma, typescript, backend, API

### Description

Build a thread-first Email Threads API for the warpSpeed app.

This bounty introduces a new threaded email experience so users can work with conversations instead of isolated messages. Developers will create API support for listing email threads, opening a thread to view related messages, preserving draft activity inside the correct conversation, and ensuring search/filter behaviour remains consistent with the existing message API.

### Required Skills

- Node.js
- TypeScript
- Prisma
- API Development
- Email Systems
- Jest Testing
- Swagger / API Documentation

### Technical Requirements

1. **List Email Threads**
   - `GET /api/v1/email-threads` - Returns paginated list of email threads for the authenticated user
   - Support filtering by: date range, participants, labels, has:drafts, is:starred, is:unread
   - Sort by most recent activity (updated when drafts are created/updated/sent)
   - Include thread metadata: subject, participant list, message count, unread count, last activity date

2. **Open Thread Detail**
   - `GET /api/v1/email-threads/:id` - Returns thread metadata with all related messages
   - Messages ordered by sentDate ascending (oldest first)
   - Include drafts in correct position based on createdAt/updatedAt
   - Exclude archived and deleted messages by default; include with `?includeArchived=true`

3. **Thread Grouping for Search/Filter**
   - `GET /api/v1/email-threads/search?q=...` - Search threads by content across all messages
   - Group results by thread, returning thread-level metadata
   - Maintain consistency with existing `/messages` search behavior

4. **Draft Thread Association**
   - `POST /api/v1/drafts` - Create draft within a thread (or create new thread)
   - `PUT /api/v1/drafts/:id` - Update draft, update thread lastActivityAt
   - `POST /api/v1/drafts/:id/send` - Send draft, update thread ordering
   - Drafts must appear in correct thread when listed

5. **Sync Integration**
   - Gmail sync: Map `threadId` to warpSpeed thread on import
   - Outlook sync: Map `conversationId` to warpSpeed thread on import
   - IMAP sync: Group by `Message-ID`, `In-Reply-To`, `References` headers
   - Update thread recency on sync

6. **Access Control**
   - User can only access threads where they own at least one message
   - Respect existing message-level permissions

### Data Model (Prisma)


Payment happens after the PR is approved and merged.
