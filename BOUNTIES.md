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

This repository contains paid bounty tasks for developers contributing to warpSpeed OPEN.

## Available Bounties

### [PAID BOUNTY - $440] Messenger Group Chat Poll Creation & Voting UI

Implementation of poll creation and voting feature for group chats.

**Features:**
- Poll creation from group chat input area
- Poll question input (255 character limit)
- Multiple answer options (up to 12 options)
- Single-choice or multiple-choice voting support
- Inline poll messages in chat conversation
- Direct voting from chat interface
- Real-time result updates
- Visual result bars/progress indicators
- "View Votes" bottom sheet functionality
- Detailed voter list per option
- Persistent poll display in chat history

**Technical Implementation:**

1. **Poll Creation Component:**
   - Accessible from group chat input action menu
   - Input validation for question length (255 chars)
   - Support for up to 12 poll options
   - Real-time preview of poll creation

2. **Poll Message Component:**
   - Inline poll display in chat
   - Interactive voting interface
   - Visual progress bars for each option
   - Real-time vote counting
   - Percentage calculations based on total participants

3. **Voting Interface:**
   - Single tap voting mechanism
   - Multiple choice selection support
   - Vote result visualization
   - "View Votes" bottom sheet integration

4. **UI/UX Requirements:**
   - Smooth, intuitive poll creation flow
   - Consistent with modern messaging app design
   - Responsive vote updating
   - Clean, accessible result display

**Storybook Components:**
- PollCreationForm - Form for creating new polls
- PollMessage - Interactive poll display component
- PollOption - Individual poll option with voting UI
- PollResults - Real-time results visualization
- ViewVotesSheet - Detailed voting insights panel

**File Structure:**


Payment happens after the PR is approved and merged.
