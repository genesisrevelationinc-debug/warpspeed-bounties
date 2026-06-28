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

This document tracks active, claimed, and completed bounties in the warpSpeed OPEN programme.

---

## Active Bounties

### [PAID BOUNTY - $660] Note Locking - Biometrics/PIN

| Field | Details |
|-------|---------|
| **Bounty ID** | WSB-2024-001 |
| **Status** | 🟡 Open — Awaiting Developer Assignment |
| **Reward** | $660 USD |
| **Difficulty** | Medium |
| **Category** | React Native, TypeScript, UI, Security |
| **Labels** | `help wanted`, `bounty`, `paid`, `typescript`, `ui`, `react-native`, `frontend`, `security` |
| **GitHub Issue** | #1 |
| **Design Reference** | [Adobe XD Prototype](https://xd.adobe.com/view/b74cd4eb-ec51-400e-bdb2-5041a123510c-e21f/) |

### Overview

Build note-level locking for the warpSpeed Notes experience using biometrics, device authentication, or a user-defined PIN.

This bounty gives users a private vault inside Notes. Users should be able to lock new or existing notes, clearly see which notes are locked, and unlock them only after successful authentication.

Locked notes must stay hidden or obscured until unlocked, and the app should require re-authentication after app restart or after a configurable timeout.

---

### Technical Requirements

#### Core Functionality
- [ ] **Lock New Note**: Ability to set a lock when creating a new note
- [ ] **Lock Existing Note**: Ability to add a lock to an existing, previously unlocked note
- [ ] **Authentication Methods**:
  - Face ID (iOS)
  - Touch ID (iOS)
  - Fingerprint (Android)
  - Device PIN / Passcode
  - User-defined PIN (fallback when biometrics unavailable)
- [ ] **Unlock Note**: Secure authentication flow to reveal locked note content
- [ ] **Remove Lock**: Ability to remove a note lock through note settings
- [ ] **Change Lock Settings**: Ability to change authentication method through note settings

#### Security Requirements
- [ ] **Content Protection**: No note content revealed before successful unlock
- [ ] **Obscured State**: Locked notes hidden or obscured in list and detail views
- [ ] **Re-authentication on App Restart**: All locked notes require re-authentication after app restart
- [ ] **Configurable Timeout**: Re-authentication required after configurable timeout period (default: 5 minutes)
- [ ] **Authentication Gate**: Authentication required before removing or changing a lock
- [ ] **Secure Storage**: Lock credentials and state stored using platform secure storage (Keychain/Keystore)

#### UI/UX Requirements
- [ ] **Lock Indicators**: Clear visual indicators (lock icons, labels) showing locked state
- [ ] **Lock Screen**: Secure, branded lock screen for unauthenticated access attempts
- [ ] **Settings Integration**: Lock controls accessible from note settings menu
- [ ] **Empty State**: Appropriate messaging when no locked notes exist
- [ ] **Error Handling**: Graceful handling of biometric cancellation, failures, and unavailable states

#### Architecture Requirements
- [ ] **Clean Separation**: Authentication layer, note-locking logic, and UI components cleanly separated
- [ ] **Reusable Components**: TypeScript and React Native implementation that can be extended later
- [ ] **Type Safety**: Full TypeScript coverage with proper interfaces and types
- [ ] **Test Coverage**: Unit tests for lock logic, authentication service, and UI components
- [ ] **Platform Support**: iOS and Android with graceful degradation

---

### Acceptance Criteria

| # | Criteria | Weight |
|---|----------|--------|
| 1 | All core functionality implemented and working | 25% |
| 2 | Security requirements met with no data leakage | 20% |
| 3 | UI matches design reference and provides clear UX | 20% |
| 4 | Clean, reusable architecture with proper separation | 15% |
| 5 | Full TypeScript coverage and test coverage > 80% | 10% |
| 6 | Documentation and code comments | 10% |

**Minimum 90% specification match required for consideration.**

---

### Claim Process

1. Visit [warpSpeed Bounties](https://warpspeedopen.org/bounties)
2. Sign up as a developer at [warpSpeed Signup](https://warpspeedopen.org/signup)
3. Comment on GitHub Issue #1:
   > "I have signed up and would like to claim this bounty."
4. **Wait for maintainer confirmation before starting work**

---

### Submission Rules

- ⛔ **Do not start work until a maintainer confirms your claim**
- Maximum 3 submission attempts
- First code commit required at halfway mark between bounty start and expiration
- Code must be original or properly licensed
- Payment made only at 100% completion
- Payment processed only after PR is approved and merged

---

## Completed Bounties

*No completed bounties yet.*

---

*Last updated: 2024*
Payment happens after the PR is approved and merged.
