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

This file tracks active and completed bounty tasks for the warpSpeed OPEN programme.

## Active Bounties

| Bounty | Reward | Status | Claimed By |
|--------|--------|--------|------------|
| Email Threads API | $750 | Open | - |

## Completed Bounties

_None yet._

## How to Claim a Bounty

1. Browse available bounties on [warpspeedopen.org/bounties](https://warpspeedopen.org/bounties)
2. Sign up as a developer on the website
3. Comment on the GitHub issue: "I have signed up and would like to claim this bounty."
4. Wait for maintainer confirmation before starting work
5. Submit your pull request before the bounty deadline

## Bounty Rules

- Do not start work until a maintainer confirms your claim
- Maximum 3 submission attempts
- Minimum 90% specification match required for consideration
- Payment is made only at 100% completion
- Payment is processed only after the pull request is approved and merged
- First code commit is required at the halfway mark between bounty start and bounty expiration
- Code must be original or properly licensed
- The official bounty page is the source of truth for full requirements, rules, and deadlines

## Email Threads API Bounty

**Reward:** $750
**Difficulty:** Hard
**Skills:** Node.js, TypeScript, Prisma, API Development, Email Systems, Jest Testing, Swagger / API Documentation

### Description

Build a thread-first Email Threads API for the warpSpeed app. This bounty introduces a new threaded email experience so users can work with conversations instead of isolated messages.

### Requirements

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

### Full Details

See the official bounty page for complete technical requirements, submission rules, acceptance criteria, and final implementation expectations:
[https://warpspeedopen.org/bounties](https://warpspeedopen.org/bounties)
Payment happens after the PR is approved and merged.
