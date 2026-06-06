# Contributing to warpSpeed Bounties

Thank you for your interest in contributing to warpSpeed OPEN.

## Before you start

Please do not begin paid bounty work until a maintainer confirms your assignment.

## Claiming a bounty

1. Open the bounty issue.
2. Sign up on the website: https://warpspeedopen.org/signup
3. Comment on the issue: `I have signed up and would like to claim this bounty.`
4. Wait for maintainer confirmation.
5. Start work only after confirmation.

## Pull request rules

- Keep the PR focused on the bounty scope.
- Include clear screenshots or videos for UI work.
- Include test notes where possible.
- Link the bounty issue in the PR description.
- Do not include secrets, API keys, or private credentials.

## Review and payment

Payment is processed only after:

- the submitted PR meets the acceptance criteria,
- maintainers approve it,
# Contributing to warpSpeed Bounties

## Bounty Development Guidelines

### Email Threads API Implementation Standards

When implementing the Email Threads API bounty, please adhere to the following standards:

#### API Design
- Follow RESTful conventions for all endpoints
- Use consistent response formats with the existing messages API
- Implement proper pagination for list endpoints
- Include comprehensive Swagger/OpenAPI documentation

#### Database & Prisma
- Use Prisma migrations for any schema changes
- Ensure thread grouping is efficient at the database level
- Maintain referential integrity between messages and threads
- Consider performance implications of thread aggregation queries

#### Authentication & Authorization
- Enforce ownership checks on all endpoints
- Verify user has access to requested threads
- Maintain consistency with existing auth middleware

#### Testing Requirements
- Write Jest tests for all new endpoints
- Include tests for:
  - Authentication and access control
  - Thread ordering (recency)
  - Filter and search functionality
  - Draft message handling
  - Thread detail retrieval
- Aim for >80% code coverage on new code

#### Sync Behavior
- Ensure Gmail sync updates thread ordering correctly
- Ensure Outlook sync updates thread ordering correctly
- Ensure IMAP sync updates thread ordering correctly
- Handle edge cases where sync creates new vs. existing threads

#### Code Quality
- Use TypeScript strict mode
- Follow existing linting rules
- Document complex thread logic with comments
- Ensure backwards compatibility where possible
- and the PR is merged.
