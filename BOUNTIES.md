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

This document tracks active and completed bounties for the warpSpeed OPEN programme.

## Active Bounties

### Note Locking - Biometrics/PIN

| Field | Details |
|-------|---------|
| **Bounty ID** | BNT-001 |
| **Reward** | $660 |
| **Status** | 🟢 Active / Claimable |
| **Difficulty** | Medium |
| **Category** | React Native, TypeScript, Security, UI |

#### Description

Build note-level locking for the warpSpeed Notes experience using biometrics, device authentication, or a user-defined PIN.

This bounty gives users a private vault inside Notes. Users should be able to lock new or existing notes, clearly see which notes are locked, and unlock them only after successful authentication.

Locked notes must stay hidden or obscured until unlocked, and the app should require re-authentication after app restart or after a configurable timeout.

#### Technical Requirements

##### Core Features
- [ ] **Lock New Note**: Ability to set a lock when creating a new note
- [ ] **Lock Existing Note**: Ability to add a lock to an existing note
- [ ] **Authentication Methods**:
  - Face ID (iOS)
  - Touch ID (iOS)
  - Fingerprint (Android)
  - Device PIN / Passcode
  - User-defined PIN (fallback)
- [ ] **Locked State UI**: Clear visual indication of locked notes (lock icons, labels)
- [ ] **Content Protection**: Locked notes hidden or obscured until authentication succeeds
- [ ] **Secure Lock Screen**: Dedicated screen for authentication attempts
- [ ] **No Content Leak**: Note content must not be rendered before successful unlock

##### Security Requirements
- [ ] **Re-authentication on App Restart**: All locked notes require re-auth after app restart
- [ ] **Configurable Timeout**: Re-authentication required after configurable timeout period
- [ ] **Timeout Options**: 1 minute, 5 minutes, 15 minutes, 1 hour, or immediate
- [ ] **Secure Storage**: Lock state and authentication credentials stored securely
- [ ] **Biometric Invalidation**: Handle biometric enrollment changes

##### Note Settings
- [ ] **Remove Lock**: Ability to remove a note lock through note settings
- [ ] **Change Lock Settings**: Ability to change lock settings through note settings
- [ ] **Auth Required for Changes**: Authentication required before removing or changing a lock
- [ ] **Lock Method Selection**: Choose between biometrics, device PIN, or custom PIN

##### UI/UX Requirements
- [ ] **Lock Icons**: Clear lock/unlock icons in note list and note detail
- [ ] **Locked Note Preview**: Show title only, content obscured with blur or placeholder
- [ ] **Authentication Prompt**: Native biometric prompt or custom PIN input
- [ ] **Error States**: Handle failed authentication with retry logic
- [ ] **Settings Integration**: Lock settings accessible from note settings menu

##### Architecture Requirements
- [ ] **Clean Separation**:
  - Authentication layer (`services/auth/`)
  - Note-locking logic (`services/lock/`)
  - UI components (`components/notes/`)
- [ ] **Reusable TypeScript**: Implementation must be fully typed and extensible
- [ ] **React Native**: Compatible with iOS and Android
- [ ] **Test Coverage**: Unit tests for lock logic and authentication flow

#### Design Reference

[Adobe XD Design](https://xd.adobe.com/view/b74cd4eb-ec51-400e-bdb2-5041a123510c-e21f/)

#### Submission Rules

1. Maximum 3 submission attempts
2. Minimum 90% specification match required for consideration
3. Payment at 100% completion only
4. First code commit required at halfway mark
5. Code must be original or properly licensed

#### How to Claim

1. Visit [warpSpeed Bounties](https://warpspeedopen.org/bounties)
2. Sign up as a developer
3. Comment on this GitHub issue:

   > "I have signed up and would like to claim this bounty."

4. Wait for maintainer confirmation before starting work

#### Payment

- Payment processed after PR approval and merge
- Payment method: [To be specified by maintainer]

---

## Completed Bounties

*No completed bounties yet.*

---

## Bounty Status Legend

| Symbol | Meaning |
|--------|---------|
| 🟢 | Active / Claimable |
| 🟡 | Claimed / In Progress |
| 🔴 | Completed |
| ⚫ | Cancelled |

---

*Last updated: [Auto-generated]*

*For questions, contact: bounties@warpspeedopen.org*
Payment happens after the PR is approved and merged.
