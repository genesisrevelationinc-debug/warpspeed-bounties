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

This document lists all active bounty tasks for the warpSpeed OPEN project.

---

## [PAID BOUNTY - $440] Messenger Group Chat Poll Creation & Voting UI

**Issue**: [#1](https://github.com/warpspeedopen-source/warpspeed-bounties/issues/1)  
**Status**: 🟢 Open  
**Reward**: $440  
**Difficulty**: Medium  
**Labels**: `help wanted`, `bounty`, `paid`, `open`, `typescript`, `ui`, `react-native`, `frontend`

### Overview

Build a poll creation and voting feature for group chats in the warpSpeed app.

The feature should allow users to create polls directly from the group chat input area, send polls inline into the conversation, vote on options, view real-time results, and open a detailed "View Votes" bottom sheet.

The experience should feel smooth, intuitive, and consistent with modern messaging apps such as WhatsApp.

### Design Reference

[Adobe XD Prototype](https://xd.adobe.com/view/0cec7f20-eb33-402e-be87-f7e02753e028-59bf/)

### Technical Requirements

#### Core Features

| Feature | Description |
|---------|-------------|
| Poll Creation | Initiated from group chat input action/arrow menu |
| Question Input | Text input with 255 character limit |
| Options | Multiple answer options, up to 12 maximum |
| Voting Modes | Single-choice or multiple-choice support |
| Inline Display | Poll renders as a message bubble in chat |
| Direct Voting | Vote directly from the chat interface |
| Real-time Results | Live result updates with visual progress bars |
| Percentage Calculation | Based on total group participants |
| View Votes | Action to open detailed voting insights |
| Bottom Sheet | Shows voter profile previews and detailed voter list per option |
| Persistence | Poll remains visible in chat history |

#### UI/UX Requirements

- Smooth, intuitive interactions
- Consistent with modern messaging apps (WhatsApp-style)
- Visual result bars or progress indicators
- Voter profile previews in bottom sheet
- Detailed voter list per option

#### Technical Stack

- React Native
- TypeScript
- Storybook (for component development)
- UI Components
- Mobile Interaction Design
- Real-time UI States

### Deliverables

1. Reusable poll components
2. Poll creation flow
3. Inline poll message component
4. Voting interface
5. Results display with progress bars
6. "View Votes" bottom sheet
7. Storybook stories for all components
8. Composed view demonstrating full user experience

### How to Claim

1. Visit [warpSpeed Bounties](https://warpspeedopen.org/bounties)
2. Sign up as a developer
3. Review full bounty details and rules
4. Comment on the GitHub issue:

   > "I have signed up and would like to claim this bounty."

5. **Wait for maintainer confirmation before starting work**

### Important Rules

See the [GitHub issue](https://github.com/warpspeedopen-source/warpspeed-bounties/issues/1) and [official bounty page](https://warpspeedopen.org/bounties) for complete rules, deadlines, and submission requirements.

The official bounty page is the **source of truth** for full requirements, rules, and deadlines.
Payment happens after the PR is approved and merged.
