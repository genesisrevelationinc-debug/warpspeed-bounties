# warpSpeed Bounties List

This repository contains the list of available bounties for the warpSpeed platform.

## Available Bounties

### [PAID] Messenger Group Chat Poll Creation & Voting UI

* **Bounty ID**: WS-2024-001
* **Status**: Available
* **Reward**: $440
* **Difficulty**: Medium
* **Category**: Frontend UI / React Native
* **Type**: Feature Implementation
* **Description**: Build a poll creation and voting feature for group chats
*
* **Requirements**:
*   - Poll creation from group chat input area
*   - Poll question input with 255 character limit
*   - Support for up2 to 12 poll options
*   - Single-choice and multiple-choice poll support
*   - Real-time result updates
*   - Visual result bars/progress indicators
*   - "View Votes" bottom sheet with voter insights
*   - Persistent poll display in chat history
*
* **Technical Specifications**:
*   - Reusable poll component
*   - Inline poll message in chat conversation
*   - Real-time voting result updates
*   - Progress indicators for vote percentages
*   - Support for voter profile previews
*   - Responsive design for mobile
*
* **Deliverables**:
*   - Poll creation UI component
*   - Poll voting interface
*   - Poll result visualization
*   - "View Votes" bottom sheet component
*   - Storybook documentation for all poll components
*
* **Design Reference**:
*   - Adobe XD Mockup: https://xd.adobe.com/view/0cec7f20-eb33-402e-be87-f7e02753e028-59bf/
*
* **File Changes Required**:
*   - components/PollCreationComponent.tsx
*   - components/PollVotingComponent.tsx
*   - components/PollResultsComponent.tsx
*   - components/PollViewVotesComponent.tsx
*   - components/PollComponent.tsx
*   - stories/PollComponents.stories.tsx
*
* **Implementation Details**:
*   - Add poll creation to group chat input menu
*   - Implement character limit validation (255 chars)
*   - Support up to 12 poll options
*   - Single and multiple choice options
*   - Real-time result updates
*   - Visual progress indicators
*   - Voter detail bottom sheet
*   - Persistent poll message storage
*
* **Acceptance Criteria**:
*   - [ ] Poll creation from input menu
*   - [ ] Poll message displays inline in chat
*   - [ ] Users can vote on poll options
*   - [ ] Real-time vote result updates
*   - [ ] "View Votes" bottom sheet displays
*   - [ ] Voter profile previews display
*   - [ ] Polls persist in chat history
*   - [ ] Storybook components for all poll UI
*
* **Component Breakdown**:
*
* *PollCreationComponent.tsx*:
*   - Accessible from group chat input arrow menu
*   - Input validation for 255 character question limit
*   - Support for 2-12 poll options
*   - Single/multiple choice selector
*
* *PollVotingComponent.tsx*:
*   - Inline poll display in conversation
*   - Interactive voting interface
*   - Real-time result updates
*   - Progress bar visualization
*
* *PollResultsComponent.tsx*:
*   - Detailed voting results display
*   - Vote percentage calculations
*   - Voter list per option
*
* *PollViewVotesComponent.tsx*:
*   - Bottom sheet voter details
*   - Voter profile image display
*   - Option-specific voter lists
*
* **Storybook**:
*   - Reusable component stories
*   - Visual test cases
*   - Interaction documentation
*
* **Files to Create/Modify**:
*   - src/components/poll/PollCreationComponent.tsx
*   - src/components/poll/PollVotingComponent.tsx
*   - src/components/poll/PollResultsComponent.tsx
*   - src/components/poll/PollViewVotesComponent.tsx
*   - src/components/poll/PollComponent.tsx
*   - src/stories/PollComponents.stories.tsx
*
* **Estimated Implementation Time**: 8-12 hours
*
* **Pull Request Requirements**:
*   - All components built with TypeScript
*   - Full Storybook integration
*   - Mobile-first responsive design
*   - All acceptance criteria met
*
* **Payment**: $440 upon approval
*


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

Payment happens after the PR is approved and merged.
