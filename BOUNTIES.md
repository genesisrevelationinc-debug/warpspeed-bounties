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

This document tracks active and completed bounty tasks for the warpSpeed OPEN developer programme.

## Active Bounties

### [PAID BOUNTY - $440] Messenger Group Chat Poll Creation & Voting UI

**Status:** Open for claims  
**Reward:** $440  
**Difficulty:** Medium  
**Labels:** help wanted, bounty, paid, open, typescript, ui, react-native, frontend

#### Overview

Build a poll creation and voting feature for group chats in the warpSpeed app.

The feature should allow users to create polls directly from the group chat input area, send polls inline into the conversation, vote on options, view real-time results, and open a detailed "View Votes" bottom sheet.

The experience should feel smooth, intuitive, and consistent with modern messaging apps such as WhatsApp.

#### Technical Requirements

- **Platform:** React Native with TypeScript
- **UI Framework:** Storybook for component development and testing
- **Target:** Group chat messaging interface

#### Feature Scope

##### Poll Creation
- Access poll creation from the group chat input action/arrow menu
- Poll question input field with 255 character limit
- Multiple answer options (up to 12 options maximum)
- Support for both single-choice and multiple-choice voting modes
- Intuitive add/remove option interface

##### Poll Display (Inline Chat Message)
- Poll renders inline within the chat conversation
- Question text prominently displayed
- Option list with selection indicators
- Real-time vote count and percentage display
- Visual progress bars showing vote distribution
- Percentage calculation based on total group participants

##### Voting Interaction
- Direct voting from the chat bubble without leaving the conversation
- Single-tap vote for single-choice polls
- Multi-select capability for multiple-choice polls
- Visual feedback on selection
- Ability to change vote (if enabled)

##### Real-Time Results
- Live update of vote counts and percentages
- Smooth animated transitions for result bars
- Updated view for all participants in real-time

##### "View Votes" Bottom Sheet
- Accessible action to open detailed voting insights
- Bottom sheet modal presentation
- Voter profile previews (avatars)
- Detailed voter list per option
- Expandable/collapsible option sections

##### Chat History Persistence
- Polls remain visible and interactive in chat history
- Historical vote data preserved
- Consistent display across app restarts

#### Design Reference

[Adobe XD Design Mockup](https://xd.adobe.com/view/0cec7f20-eb33-402e-be87-f7e02753zet028-59bf/)

#### Component Deliverables (Storybook)

The following Storybook stories should be implemented:

1. **PollCreationForm** - Full poll creation interface
2. **PollOptionInput** - Individual option input with add/remove
3. **PollMessageBubble** - Inline poll display in chat
4. **PollOptionResult** - Single option with vote bar
5. **PollVoteSheet** - Bottom sheet with detailed votes
6. **VoterAvatarList** - Horizontal voter preview avatars
7. **VoterListItem** - Individual voter detail row
8. **PollTypeSelector** - Single vs multiple choice toggle
9. **PollCreationMenu** - Chat input action menu trigger
10. **PollMessageComposer** - Full composed chat integration

#### Acceptance Criteria

- [ ] All Storybook components render correctly with mock data
- [ ] Poll creation flow allows 2-12 options with 255-char question
- [ ] Single and multiple choice modes function correctly
- [ ] Vote percentages calculate accurately based on participant count
- [ ] Real-time updates reflect across all UI states
- [ ] "View Votes" bottom sheet displays voter details per option
- [ ] UI matches design reference (90%+ fidelity)
- [ ] TypeScript types are complete and strict
- [ ] Components are reusable and properly documented
- [ ] Accessibility labels and hints included
- [ ] Works on both iOS and Android

#### How to Claim

1. Visit [warpSpeed Bounties](https://warpspeedopen.org/bounties)
2. Sign up as a developer
3. Comment on the GitHub issue: "I have signed up and would like to claim this bounty."
4. Wait for maintainer confirmation before starting work

---

## Completed Bounties

*No completed bounties yet.*
Payment happens after the PR is approved and merged.
