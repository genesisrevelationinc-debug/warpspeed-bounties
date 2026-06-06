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

## Current Bounties

### Email Threads API - $750

#### Overview
Build a thread-first Email Threads API for the warpSpeed app.

This bounty introduces a new threaded email experience so users can work with conversations instead of isolated messages.

#### Reward
- $750

#### Difficulty
Hard

#### Main Skills
- Node.js
- TypeScript
- Prisma
- API Development
- Email Systems
- Jest Testing
- Swagger / API Documentation

#### Requirements

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

#### Technical Specifications

1. **Thread Listing Endpoint**
   - GET `/api/threads`
   - Should support pagination
   - Should support filtering by labels, read status, etc.
   - Should exclude archived and deleted messages by default

2. **Thread Detail Endpoint**  
   - GET `/api/threads/{threadId}`
   - Should return thread metadata and all related messages
   - Should maintain proper ordering of messages within thread
   - Should include draft messages in correct position

3. **Data Models**
   - Thread model should include metadata like subject, participants, timestamps
   - Message model should reference thread associations
   - Drafts should maintain thread context
   
4. **Search and Filtering**
   - Search should work across all messages in threads
   - Filters should respect thread boundaries
   - Results should be grouped by thread

5. **Draft Handling**
   - Drafts should automatically associate with existing threads or create new ones
   - Thread recency should update when drafts are modified
   - Drafts should maintain proper position in thread

6. **Sync Integration**
   - Thread ordering should update based on IMAP, Gmail, Outlook sync events
   - Thread associations should be preserved across email providers

7. **Access Control**
   - Threads should respect the same ownership rules as messages
   - Users should only see threads they have access to

8. **Documentation**
   - All endpoints must be documented with Swagger/OpenAPI
   - Clear examples of requests/responses required
   - Error handling documentation

9. **Testing**
   - Unit tests for all API endpoints
   - Integration tests for thread creation and management
   - Authentication and authorization tests
   - Search and filter tests
   - Draft handling within threads tests

#### Deliverables

1. **API Endpoints**
   - Thread listing endpoint with proper filtering
   - Thread detail endpoint with messages
   - Proper error handling and response codes

2. **Database Schema Updates**
   - Thread model definition
   - Message-thread relationship handling
   - Proper indexing for performance

3. **Code Quality**
   - TypeScript interfaces for all API responses
   - Comprehensive test coverage (>90%)
   - Proper error handling and validation
   - Clean, documented code following project conventions

4. **Documentation**
   - Swagger/OpenAPI specification
   - README updates if required
   - Inline code documentation

#### Acceptance Criteria

The implementation must:
- Match 90%+ of the specification
- Pass all existing tests
- Include comprehensive new tests
- Maintain backward compatibility with existing message API
- Handle edge cases around drafts and threading
- Properly handle authentication and authorization
- Include proper error responses
- Follow existing codebase patterns and conventions

#### Submission Process

1. Fork the repository
2. Create a branch for your implementation
3. Implement all requirements
4. Write comprehensive tests
5. Update documentation
6. Ensure all tests pass
7. Submit pull request with detailed implementation notes
Payment happens after the PR is approved and merged.
