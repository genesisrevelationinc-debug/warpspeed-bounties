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

## Email Threads API Implementation Specification

### Overview
The Email Threads API will provide a thread-first approach to email management, allowing users to work with email conversations rather than isolated messages. This document specifies the technical requirements for implementation.

### Database Schema Changes

#### EmailThread Model
- id: UUID (Primary Key)
- subject: String - The thread subject (derived from the first email's subject)
- messageIds: EmailMessage[] - Array of message IDs in chronological order
- participants: ThreadParticipant[] - Array of participants in the thread
- firstMessageTimestamp: DateTime - Timestamp of the earliest message
- lastMessageTimestamp: DateTime - Timestamp of the most recent message
- messageCount: Integer - Total count of messages in thread
- hasUnread: Boolean - Whether thread contains unread messages
- isArchived: Boolean - Thread-level archive status
- isDeleted: Boolean - Thread-level deletion status
- draft: ThreadDraft - Associated draft (if any)
- userId: UUID - Owner of the thread
- createdAt: DateTime - When the thread was created
- updatedAt: DateTime - When the thread was last updated

#### ThreadParticipant Model
- id: UUID
- email: String - Participant email address
- name: String - Participant display name
- role: Enum - SENDER, RECEIVER, CC, BCC
- threadId: UUID - Reference to parent thread

#### ThreadDraft Model
- id: UUID
- threadId: UUID - Reference to the thread containing this draft
- subject: String - Draft subject
- body: String - Draft content
- to: ThreadParticipant[] - Recipients
- cc: ThreadParticipant[] - CC recipients
- bcc: ThreadParticipant[] - BCC recipients
- createdAt: DateTime - When draft was created
- updatedAt: DateTime - When draft was last modified

### API Endpoints

#### List Email Threads

Payment happens after the PR is approved and merged.
