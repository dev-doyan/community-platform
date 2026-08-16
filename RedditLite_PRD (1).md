# RedditLite — Product Requirements Document

**Version:** 1.0  
**Type:** Backend-focused social media platform  
**Stack:** Node.js, Express.js, MongoDB, Mongoose

---

## 1. Product Overview

RedditLite is a simplified Reddit-like social media platform built primarily as a backend learning project. The platform allows users to register, authenticate, create and join communities, publish posts within communities, and comment on posts.

The project is intentionally limited in scope so that MongoDB and Mongoose concepts can be learned and practiced through real features rather than isolated examples.

## 2. Product Goal

Build a clean, functional Reddit-like backend that reinforces existing backend concepts while introducing MongoDB and Mongoose-specific database design and querying techniques.

### Goals

- Learn MongoDB through a real backend application.
- Practice Mongoose schema and model design.
- Understand relationships between MongoDB documents.
- Build authentication and authorization into a practical API.
- Practice CRUD, filtering, searching, pagination, indexing, and aggregation.
- Keep the project small enough to complete and maintain.

## 3. Project Scope

### 3.1 In Scope

- User registration, login, logout, and authentication.
- User profiles containing username, email, bio, and account metadata.
- **No profile pictures or avatar functionality.**
- Community creation and browsing.
- Joining and leaving communities.
- Creating, reading, editing, and deleting posts.
- Comments on posts.
- Editing and deleting comments by their authors.
- Basic post search and filtering.
- Pagination.
- MongoDB indexes.
- Basic aggregation for statistics.
- Authorization for protected actions.
- Validation and consistent error handling.

### 3.2 Out of Scope

- Post upvotes and downvotes.
- Comment voting.
- Profile pictures or avatars.
- Real-time chat.
- Notifications.
- Recommendation algorithms.
- Advanced moderation systems.
- Awards, coins, karma, or reputation systems.
- OAuth/social login.
- Email verification and password reset for v1.
- Redis.
- Docker.
- Microservices.
- File/image/video uploads.
- Real-time feeds.

## 4. Target Users

- Registered users who want to participate in communities.
- Community creators who want to create and manage communities.
- Developers using the project as a learning/reference backend.

## 5. Core User Flows

### 5.1 Registration and Login

1. User submits username, email, and password.
2. Backend validates the input.
3. Backend checks whether username/email already exists.
4. Password is securely hashed before storage.
5. User account is created.
6. User logs in with valid credentials.
7. Backend creates an authenticated session/token according to the chosen authentication implementation.
8. Protected routes require valid authentication.

### 5.2 Community Flow

1. Authenticated user creates a community.
2. Community receives a unique name.
3. Creator becomes the community creator/member.
4. Other users can browse the community.
5. Authenticated users can join or leave the community.
6. Community page displays its posts.

### 5.3 Post Flow

1. Authenticated user joins or has access to a community.
2. User creates a post with title and content.
3. Post is associated with its author and community.
4. Users can view posts globally or inside a community.
5. Author can edit or delete their own post.
6. Other users can comment on the post.

### 5.4 Comment Flow

1. Authenticated user opens a post.
2. User submits a comment.
3. Comment is associated with the author and post.
4. Users can view comments for the post.
5. Comment author can edit or delete their own comment.

## 6. Data Model

Version 1 will contain four MongoDB collections:

- `User`
- `Community`
- `Post`
- `Comment`

### 6.1 User Document

Proposed fields:

- `_id` — MongoDB ObjectId.
- `username` — required and unique.
- `email` — required and unique.
- `password` — required; stored only as a secure hash.
- `bio` — optional text.
- `createdAt` — account creation timestamp.
- `updatedAt` — last update timestamp.

**There will be NO avatar, profile picture, or image field.**

### 6.2 Community Document

- `_id` — MongoDB ObjectId.
- `name` — required and unique.
- `description` — required or validated text.
- `creator` — reference to User.
- `members` — array of User references for v1.
- `createdAt` — creation timestamp.
- `updatedAt` — last update timestamp.

### 6.3 Post Document

- `_id` — MongoDB ObjectId.
- `title` — required.
- `content` — required.
- `type` — initially text/link if link posts are implemented; otherwise text-only for the first milestone.
- `author` — reference to User.
- `community` — reference to Community.
- `createdAt` — creation timestamp.
- `updatedAt` — last update timestamp.

### 6.4 Comment Document

- `_id` — MongoDB ObjectId.
- `content` — required.
- `author` — reference to User.
- `post` — reference to Post.
- `createdAt` — creation timestamp.
- `updatedAt` — last update timestamp.

## 7. Relationships

- User creates Community.
- User joins Community.
- User creates Post.
- Community contains Post.
- User writes Comment.
- Post contains Comment.
- Post belongs to one Community.

Posts and comments will use references to related documents rather than duplicating complete user or community objects. The project will use `populate()` where appropriate.

## 8. Functional Requirements

### 8.1 Authentication

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Authenticate a user |
| POST | `/auth/logout` | Terminate authentication |
| GET | `/auth/me` | Return the currently authenticated user |

### 8.2 Users

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/users/:username` | View a user's public profile |
| PATCH | `/users/me` | Update the authenticated user's editable information |

Additional requirements:

- Public profile must not expose the password.
- Profile picture functionality must not exist in v1.

### 8.3 Communities

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/communities` | Create a community |
| GET | `/communities` | List communities |
| GET | `/communities/:name` | Get a community |
| POST | `/communities/:name/join` | Join a community |
| DELETE | `/communities/:name/leave` | Leave a community |

Only the creator can perform creator-only management actions.

### 8.4 Posts

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/communities/:name/posts` | Create a post |
| GET | `/communities/:name/posts` | List community posts |
| GET | `/posts` | List posts with pagination |
| GET | `/posts/:id` | Get one post |
| PATCH | `/posts/:id` | Update an owned post |
| DELETE | `/posts/:id` | Delete an owned post |

### 8.5 Comments

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/posts/:id/comments` | Create a comment |
| GET | `/posts/:id/comments` | List comments |
| PATCH | `/comments/:id` | Update an owned comment |
| DELETE | `/comments/:id` | Delete an owned comment |

### 8.6 Search and Filtering

- Search posts by relevant text fields.
- Filter posts by community.
- Sort posts by creation date.
- Support pagination using `page`/`limit` or an equivalent approach.
- Search communities by name.

## 9. Authorization Rules

- Only authenticated users can create communities, posts, and comments.
- Only the author of a post can edit or delete that post.
- Only the author of a comment can edit or delete that comment.
- Only the community creator can perform creator-only community management.
- Users cannot join the same community multiple times.
- A user cannot perform authenticated actions using another user's identity.

## 10. API Response and Error Requirements

- Use appropriate HTTP status codes.
- Return clear error messages.
- Validate request bodies and route parameters.
- Do not expose passwords or password hashes.
- Keep response structures consistent across endpoints.
- Handle invalid MongoDB ObjectIds safely.
- Handle duplicate username/email/community-name errors.

## 11. MongoDB Learning Objectives

The project is designed to introduce MongoDB progressively.

- MongoDB databases, collections, and documents.
- Mongoose connections.
- Mongoose schemas and models.
- Schema validation.
- ObjectId references.
- Embedded versus referenced data.
- `populate()`.
- CRUD queries.
- Query operators.
- Filtering and sorting.
- Pagination.
- Unique indexes.
- Compound indexes where useful.
- Text/search indexes.
- Aggregation pipelines.
- `$match`, `$group`, `$lookup`, `$project`, and `$sort`.
- Basic query and schema optimization.

## 12. Project Architecture

Initial backend structure:

```text
src/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── utils/
├── app.js
└── server.js
```

The exact structure can evolve as the project grows. The goal is separation of concerns without unnecessary over-engineering.

## 13. Development Milestones

### Milestone 1 — Setup

Initialize Node.js/Express project, configure environment variables, connect MongoDB with Mongoose, and establish project structure.

### Milestone 2 — User Authentication

Implement registration, password hashing, login, logout, authentication middleware, and basic user profile.

### Milestone 3 — Communities

Implement community creation, listing, viewing, joining, and leaving.

### Milestone 4 — Posts

Implement post creation, retrieval, update, deletion, community feeds, and pagination.

### Milestone 5 — Comments

Implement comment creation, listing, update, and deletion.

### Milestone 6 — Search and Indexes

Add search, filtering, sorting, and appropriate MongoDB indexes.

### Milestone 7 — Aggregation

Build simple community/user/post statistics using aggregation pipelines.

### Milestone 8 — Hardening

Improve validation, authorization, error handling, API consistency, and testing.

## 14. Testing Requirements

- Test successful requests.
- Test invalid request bodies.
- Test unauthenticated access to protected routes.
- Test unauthorized modification/deletion.
- Test duplicate usernames and emails.
- Test duplicate community names.
- Test joining and leaving communities.
- Test invalid IDs.
- Test pagination boundaries.
- Test search and filtering.

## 15. Security Requirements

- Passwords must be hashed.
- Authentication credentials must be handled securely.
- Secrets must be stored in environment variables.
- Never return passwords in API responses.
- Validate user input.
- Restrict privileged operations with authorization middleware.
- Avoid trusting user-supplied author/user IDs for ownership checks.

## 16. Future Features — Not Part of v1

- Voting system.
- Nested comment replies.
- Karma/reputation.
- Notifications.
- Moderators and advanced moderation.
- Media uploads.
- OAuth.
- Password reset and email verification.
- Real-time features.
- Redis caching.
- Docker containerization.
- Recommendation/feed ranking.

## 17. Definition of Done

RedditLite v1 is considered complete when:

- A new user can register and authenticate.
- A user can view and update their basic profile.
- No profile picture functionality exists.
- An authenticated user can create a community.
- Users can join and leave communities.
- Users can create posts inside communities.
- Users can view, update, and delete their own posts.
- Users can comment on posts.
- Users can update and delete their own comments.
- Unauthorized users cannot modify other users' content.
- Post/community search and pagination work.
- Relevant MongoDB indexes are implemented.
- At least one useful aggregation-based statistics endpoint works.
- The API has consistent validation and error handling.
- The project can be run locally using documented setup instructions.

## 18. Success Criteria

The project succeeds if it functions as a small but realistic social-media backend and, more importantly, demonstrates practical understanding of MongoDB/Mongoose data modeling, references, queries, indexes, pagination, and aggregation.

The project should remain simple enough to finish without adding unrelated infrastructure.
