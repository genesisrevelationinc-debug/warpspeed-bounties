# warpSpeed Email Threads API Implementation

## API Endpoints

### GET /api/v1/email/threads

Lists all email threads for the authenticated user.

**Query Parameters:**
- `limit` (integer, optional) - Maximum number of threads to return
- `offset` (integer, optional) - Pagination offset
- `search` (string, optional) - Search term to filter threads

**Response:**

