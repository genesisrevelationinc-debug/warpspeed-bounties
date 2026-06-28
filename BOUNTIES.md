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
| **Status** | Open |
| **Difficulty** | Hard |
| **Skills** | Node.js, TypeScript, Prisma, API Development, Email Systems, Jest, Swagger |
| **Issue** | [#1](https://github.com/warpspeedopen-source/warpspeed-bounties/issues/1) |
| **Bounty Page** | https://warpspeedopen.org/bounties |

#### Description

Build a thread-first Email Threads API for the warpSpeed app. This bounty introduces a new threaded email experience so users can work with conversations instead of isolated messages.

#### Requirements

- **List Email Threads**: Endpoint to list email threads for the authenticated user with pagination, sorting, and filtering
- **Open Thread**: Endpoint to retrieve a single thread with its metadata and all related messages
- **Thread Grouping**: Group filtered/search results by thread rather than returning isolated messages
- **Access Control**: Preserve ownership and access control rules for all thread operations
- **Draft Support**: Include drafts in the correct conversation thread; update thread recency when drafts are created, updated, or sent
- **Archive/Delete Handling**: Exclude archived and deleted messages where required by business rules
- **Sync Integration**: Ensure synced Gmail, Outlook, and IMAP emails update thread ordering correctly
- **Search Parity**: Maintain consistent search and filtering behaviour with the existing messages endpoint
- **API Documentation**: Add Swagger/OpenAPI documentation for all new endpoints
- **Testing**: Add Jest tests for auth, ordering, filters, drafts, and thread detail behaviour

#### Technical Stack

- Node.js (v18+)
- TypeScript
- Prisma ORM
- Express/Fastify
- Jest + Supertest
- Swagger/OpenAPI 3.0

#### Data Model Considerations

The implementation should consider:

- Thread entity with `id`, `subject`, `participants`, `lastMessageAt`, `messageCount`, `isDraft`, `isArchived`, `isDeleted`, `userId`, `createdAt`, `updatedAt`
- Message entity with `threadId` foreign key, `sequence` for ordering
- Proper indexing on `threadId`, `userId`, `lastMessageAt` for performance
- Draft messages linked to threads with `isDraft` flag

#### API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/threads` | List threads for authenticated user |
| GET | `/api/v1/threads/:id` | Get single thread with messages |
| POST | `/api/v1/threads/:id/drafts` | Create or update draft in thread |
| POST | `/api/v1/threads/:id/send` | Send draft and update thread |
| GET | `/api/v1/threads/search` | Search threads (mirrors message search) |

#### Query Parameters for List/Search

- `?q=` — search query across subject, participants, message body
- `?filter=` — `all`, `unread`, `drafts`, `sent`, `archived`
- `?sort=` — `recent`, `oldest`, `subject`
- `?page=` and `?limit=` — pagination

#### Acceptance Criteria

- [ ] `GET /api/v1/threads` returns paginated thread list for authenticated user
- [ ] `GET /api/v1/threads/:id` returns thread with ordered messages (including drafts)
- [ ] Search results group by thread and maintain parity with `/messages` search
- [ ] Drafts are included in correct thread and update `lastMessageAt`
- [ ] Archived/deleted messages excluded based on filter context
- [ ] Gmail/Outlook/IMAP sync updates thread ordering
- [ ] All endpoints require valid authentication
- [ ] Users cannot access threads belonging to other users
- [ ] Swagger docs available at `/api/docs`
- [ ] Jest tests achieve >80% coverage for new code
- [ ] Tests cover: auth rejection, ordering correctness, filter accuracy, draft lifecycle, thread detail

#### Submission Rules

1. Comment on the issue to claim before starting
2. Maximum 3 submission attempts
3. Minimum 90% specification match required
- [ ] Payment at 100% completion after merge
- [ ] First commit required at halfway mark
- [ ] Original code or properly licensed

---

## Completed Bounties

*No completed bounties yet.*

---

## How to Claim a Bounty

1. Browse available bounties above
2. Sign up at https://warpspeedopen.org/signup
3. Comment on the GitHub issue: *"I have signed up and would like to claim this bounty."*
4. Wait for maintainer confirmation
5. Fork, branch, and build
6. Submit PR and respond to review
7. Get paid after merge

See [README.md](README.md) for full process details.
Payment happens after the PR is approved and merged.
