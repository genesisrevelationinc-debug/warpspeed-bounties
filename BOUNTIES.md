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

This document lists active and completed bounties for the warpSpeed OPEN project.

## Active Bounties

### Note Locking - Biometrics/PIN

| Field | Details |
|-------|---------|
| **Bounty ID** | BNT-001 |
| **Reward** | $660 |
| **Status** | 🟢 Active - Claimed |
| **Difficulty** | Medium |
| **Skills** | React Native, TypeScript, Biometric Authentication, Secure UI States |

#### Description

Build note-level locking for the warpSpeed Notes experience using biometrics, device authentication, or a user-defined PIN.

This bounty gives users a private vault inside Notes. Users should be able to lock new or existing notes, clearly see which notes are locked, and unlock them only after successful authentication.

Locked notes must stay hidden or obscured until unlocked, and the app should require re-authentication after app restart or after a configurable timeout.

#### Technical Requirements

##### Core Features

1. **Lock New Note**
   - Option to enable lock during note creation
   - Prompt for authentication method selection (Biometric/PIN)
   - Secure storage of lock metadata

2. **Lock Existing Note**
   - Toggle lock from note settings/menu
   - Authentication required to enable lock
   - Graceful handling of already-locked notes

3. **Authentication Methods**
   - Face ID (iOS)
   - Touch ID (iOS)
   - Fingerprint (Android)
   - Device PIN/Passcode fallback
   - User-defined PIN as alternative
   - Graceful degradation when biometrics unavailable

4. **UI States for Locked Notes**
   - Lock icon indicator in note list
   - Obscured/hidden content preview
   - Secure lock screen overlay
   - No content leakage in previews or notifications

5. **Unlock Flow**
   - Tap locked note → authentication prompt → reveal content
   - Failed auth: remain locked, show error
   - Successful auth: temporary unlock with timeout

6. **Re-authentication Requirements**
   - Mandatory re-auth after app restart
   - Configurable timeout (default: 5 minutes)
   - Background-to-foreground triggers re-auth check

7. **Lock Management**
   - Remove lock from note settings (requires auth)
   - Change lock settings/PIN (requires auth)
   - Confirmation dialogs for destructive actions

##### Architecture Requirements

- Clean separation of concerns:
  - `auth/` - Authentication layer
  - `hooks/` - Lock state management
  - `components/` - UI components
  - `services/` - Secure storage and business logic

- TypeScript interfaces for all data structures
- Reusable components with clear prop interfaces
- Unit tests for critical security paths

##### Security Requirements

- No plain-text storage of PIN or biometric data
- Use platform secure storage (Keychain/Keystore)
- Memory clearing of sensitive data after use
- Prevent screenshot/recording on lock screen (where supported)
- Obscure content in app switcher/multitasking view

#### Implementation Checklist

- [ ] Authentication service with biometric + PIN support
- [ ] Secure storage service for lock metadata
- [ ] Lock context/provider for app-wide state
- [ ] Lock screen component
- [ ] Note list with lock indicators
- [ ] Note editor with lock toggle
- [ ] Settings for lock management
- [ ] Timeout/re-auth logic
- [ ] Unit tests
- [ ] Integration tests
- [ ] Documentation

#### Design Reference

[Adobe XD Prototype](https://xd.adobe.com/view/b74cd4eb-ec51-400e-bdb2-5041a123510c-e21f/)

#### Submission Rules

1. Maximum 3 submission attempts
2. Minimum 90% specification match required
3. Payment at 100% completion only
4. First code commit required at halfway mark
5. Code must be original or properly licensed

---

## Completed Bounties

*No completed bounties yet.*

---

## Bounty Status Legend

| Symbol | Meaning |
|--------|---------|
| 🟢 | Active - Available for claiming |
| 🟡 | Active - Claimed, in progress |
| 🔵 | Under review |
| ✅ | Completed and paid |
| ❌ | Cancelled or expired |

---

## How to Claim a Bounty

1. Visit [warpSpeed OPEN Bounties](https://warpspeedopen.org/bounties)
2. Sign up as a developer
3. Find the bounty on GitHub issues
4. Comment: "I have signed up and would like to claim this bounty."
5. Wait for maintainer confirmation before starting work

---

*For questions, contact the maintainers or join our Discord community.*
Payment happens after the PR is approved and merged.
