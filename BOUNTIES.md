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

Paid open-source bounty tasks for developers contributing to **warpSpeed OPEN**.

## Active Bounties

### [PAID BOUNTY - $750] Email Threads API

Build a thread-first Email Threads API for the warpSpeed app.

**Reward**: $750

**Difficulty**: Hard

**Main Skills Required**:
* Node.js
* TypeScript  
* Prisma
* API Development
* Email Systems
* Jest Testing
* Swagger / API Documentation

## Technical Implementation Requirements:

1. **Thread Listing API** - Create an endpoint to list email threads for authenticated user
2. **Thread Detail API** - Create an endpoint to open a single thread and return thread metadata with related messages  
3. **Thread Grouping** - Group filtered/search results by thread
4. **Access Control** - Preserve ownership and access control rules
5. **Draft Handling** - Include drafts in the correct conversation thread
6. **Thread Recency** - Update thread recency when drafts are created/updated/sent
7. **Email Sync** - Ensure synced Gmail, Outlook, IMAP emails update thread ordering
8. **Search/Filter** - Maintain consistent search/filter behaviour with existing messages endpoint
9. **Documentation** - Add Swagger/API documentation
10. **Testing** - Add Jest tests for auth, ordering, filters, drafts and thread detail behaviour

## Database Schema Changes Required:


Payment happens after the PR is approved and merged.
