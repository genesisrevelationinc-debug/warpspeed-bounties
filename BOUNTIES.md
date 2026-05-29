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

This document describes the paid bounty program for warpSpeed platform development.

## Current Bounties

### Email Threads API [**$750**]

**Status**: Open  
**Category**: Backend / API Development  
**Description**: Build a thread-first Email Threads API for the warpSpeed app that enables users to work with email conversations instead of isolated messages.

#### Requirements

- Create API endpoints for listing email threads
- Implement thread detail endpoints with message grouping
- Support for drafts within conversation threads
- Preserve Gmail/Outlook/IMAP email thread ordering
- Maintain search and filtering consistency
- Add proper authentication and access control
- Include comprehensive API documentation
- Add unit and integration tests

#### Technical Implementation

The Email Threads API should:
- Group related email messages into conversation threads
- Maintain thread recency when drafts are created/updated/sent
- Exclude archived and deleted messages appropriately
- Keep search/filter behavior consistent with existing messages API
- Support all major email providers (Gmail, Outlook, IMAP)

#### Acceptance Criteria

- [ ] Thread listing endpoint returns proper thread groups
- [ ] Thread detail endpoint returns all messages in thread
- [ ] Drafts are properly associated with threads
- [ ] Thread ordering respects recent activity
- [ ] Search and filter functionality maintained
- [ ] API documentation included
- [ ] Comprehensive test coverage
Payment happens after the PR is approved and merged.
