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

This document tracks active and completed bounties for the warpSpeed OPEN project.

## Active Bounties

### Messenger Group Chat Poll Creation & Voting UI

| Field | Details |
|-------|---------|
| **Bounty ID** | WARP-POLL-001 |
| **Reward** | $440 |
| **Difficulty** | Medium |
| **Status** | 🟢 Open - Claimed |
| **Skills** | React Native, TypeScript, Storybook, UI Components, Mobile Interaction Design, Real-time UI States |

#### Description

Build a poll creation and voting feature for group chats in the warpSpeed app.

The feature should allow users to create polls directly from the group chat input area, send polls inline into the conversation, vote on options, view real-time results, and open a detailed "View Votes" bottom sheet.

The experience should feel smooth, intuitive, and consistent with modern messaging apps such as WhatsApp.

#### Design Reference

[Adobe XD Design Mockups](https://xd.adobe.com/view/0cec7f20-eb33-402e-be87-f7e02753e028-59bf/)

#### Technical Requirements

##### Poll Creation
- [ ] Poll creation from the group chat input action/arrow menu
- [ ] Poll question input with 255 character limit
- [ ] Multiple answer options (up to 12 poll options)
- [ ] Single-choice or multiple-choice voting support
- [ ] Validation and error states for invalid inputs

##### Poll Message Component
- [ ] Inline poll message inside the chat conversation
- [ ] Persistent poll display in chat history
- [ ] Visual result bars or progress indicators
- [ ] Vote percentage calculation based on total group participants
- [ ] Real-time result updates

##### Voting Interaction
- [ ] Direct voting from the chat
- [ ] Single and multiple choice voting
- [ ] Vote change/revoke capability
- [ ] Visual feedback on vote selection

##### View Votes Bottom Sheet
- [ ] "View Votes" action on poll message
- [ ] Bottom sheet showing detailed voting insights
- [ ] Voter profile previews
- [ ] Detailed voter list per option
- [ ] Scrollable participant list

##### Storybook & Testing
- [ ] Storybook components for all poll UI elements
- [ ] Composed view for full user experience
- [ ] Interactive stories for all states
- [ ] Edge case handling (empty states, max options, etc.)

#### Component Architecture


Payment happens after the PR is approved and merged.
