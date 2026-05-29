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

This document outlines the available bounties in the warpSpeed ecosystem.

## Available Bounties

### Email Threads API (PAID - $750)

**Difficulty**: Hard

**Main Skills Required**:
- Node.js
- TypeScript
- Prisma
- API Development
- Email Systems
- Jest Testing
- Swagger / API Documentation

**Bounty Overview**:

Build a thread-first Email Threads API for the warpSpeed app.

This bounty introduces a new threaded email experience so users can work with conversations instead of isolated messages. Developers will create API support for listing email threads, opening a thread to view related messages, preserving draft activity inside the correct conversation, and ensuring search/filter behaviour remains consistent with the existing message API.

**High-Level Scope**:

The selected developer will build a thread-first email API that supports:

- Listing email threads for the authenticated user
- Opening a single thread and returning thread metadata with related messages
- Grouping filtered/search results by thread
- Preserving ownership and access control rules
- Including drafts in the correct conversation thread
- Excluding archived and deleted messages where required
- Updating thread recency when drafts are created, updated, or sent
- Ensuring synced Gmail, Outlook, and IMAP emails update thread ordering correctly
- Maintaining consistent search and filtering behaviour with the existing messages endpoint
- Adding Swagger/API documentation
- Adding Jest tests for auth, ordering, filters, drafts, and thread detail behaviour

**Technical Requirements**:

1. **Thread Listing Endpoint**
   - GET `/api/v1/threads`
   - Support pagination, sorting, and filtering
   - Return thread metadata including subject, participants, message count, and timestamps

2. **Thread Detail Endpoint**
   - GET `/api/v1/threads/{threadId}`
   - Return thread metadata with all related messages
   - Include drafts in the conversation thread

3. **Search and Filter Integration**
   - Ensure thread grouping works with existing search functionality
   - Maintain consistent filtering behavior with messages API

4. **Draft Handling**
   - Drafts should be associated with the correct conversation thread
   - Thread recency should update when drafts are created/updated/sent

5. **Access Control**
   - Maintain existing ownership and permission rules
   - Exclude archived and deleted messages from thread views

**Acceptance Criteria**:
- All endpoints properly documented with Swagger
- Comprehensive test coverage (minimum 85%)
- Code follows existing warpSpeed code style and patterns
- Proper error handling and validation
- Backward compatibility with existing message API
Payment happens after the PR is approved and merged.
