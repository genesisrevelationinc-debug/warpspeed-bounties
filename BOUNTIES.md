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

This document lists active and completed bounties for the warpSpeed OPEN project.

## Active Bounties

### Email Threads API — $750

| Field | Value |
|-------|-------|
| **ID** | BOUNTY-2024-001 |
| **Status** | Open |
| **Reward** | $750 USD |
| **Difficulty** | Hard |
| **Skills** | Node.js, TypeScript, Prisma, API Development, Email Systems, Jest, Swagger |

#### Description

Build a thread-first Email Threads API for the warpSpeed app. This bounty introduces a new threaded email experience so users can work with conversations instead of isolated messages.

#### Requirements

- **Thread Listing**: List email threads for the authenticated user with pagination, sorting by recency, and basic filtering (unread, starred, has:attachment).
- **Thread Detail**: Open a single thread and return thread metadata with related messages, including sender/recipient info, timestamps, and read status.
- **Search & Filter**: Group filtered/search results by thread; maintain consistency with existing `/messages` endpoint query parameters.
- **Draft Handling**: Preserve draft activity inside the correct conversation; update thread recency when drafts are created, updated, or sent.
- **Sync Integration**: Ensure synced Gmail, Outlook, and IMAP emails update thread ordering correctly on inbound sync.
- **Access Control**: Preserve ownership and access control rules; users may only view threads they own or have shared access to.
- **Exclusions**: Exclude archived and deleted messages where required by query flags.
- **Documentation**: Add Swagger/OpenAPI documentation for all new endpoints.
- **Testing**: Add Jest tests covering auth, ordering, filters, drafts, and thread detail behaviour.

#### API Endpoints (Proposed)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/threads` | List threads for authenticated user |
| GET | `/api/v1/threads/:id` | Get single thread with messages |
| PATCH | `/api/v1/threads/:id` | Update thread metadata (read, star, archive) |
| DELETE | `/api/v1/threads/:id` | Soft-delete a thread |
| GET | `/api/v1/threads/:id/messages` | List messages within a thread |

#### Query Parameters for `GET /api/v1/threads`

| Parameter | Type | Description |
|-----------|------|-------------|
| `q` | string | Search query (subject, body, sender) |
| `isUnread` | boolean | Filter by unread status |
| `isStarred` | boolean | Filter by starred status |
| `hasAttachment` | boolean | Filter threads with attachments |
| `label` | string | Filter by label/tag |
| `sort` | enum | `recent` (default), `oldest` |
| `limit` | number | Pagination limit (default: 20, max: 100) |
| `offset` | number | Pagination offset |

#### Acceptance Criteria

1. All endpoints return proper HTTP status codes and JSON responses.
2. Ownership and access control are enforced on every endpoint.
3. Thread recency updates when drafts are created, updated, or sent.
4. Synced emails from Gmail, Outlook, and IMAP correctly update thread ordering.
5. Search and filtering behaviour is consistent with existing `/messages` endpoint.
6. Archived and deleted messages are excluded by default unless explicitly requested.
7. Swagger documentation is accessible at `/api/docs`.
8. Jest test coverage is ≥ 80% for new code.
9. All existing tests continue to pass.

#### Submission Rules

- Do not start work until a maintainer confirms your claim on the GitHub issue.
- Maximum 3 submission attempts.
- Minimum 90% specification match required for consideration.
- Payment is made only at 100% completion.
- Payment is processed only after the pull request is approved and merged.
- First code commit is required at the halfway mark between bounty start and bounty expiration.
- Code must be original or properly licensed.

#### How to Claim

1. Visit [https://warpspeedopen.org/bounties](https://warpspeedopen.org/bounties)
2. Sign up as a developer
3. Comment on GitHub issue: *"I have signed up and would like to claim this bounty."*
4. Wait for maintainer confirmation before starting work

---

*Last updated: 2024*
Payment happens after the PR is approved and merged.
