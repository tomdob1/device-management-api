# Architecture & Design Decisions

## Overview

This is a RESTful API for managing IoT devices. I built it with simplicity and testability in mind.

---

## Technology Choices

### Express
I chose Express because it's minimal and doesn't impose a structure on you. For an API of this size, a heavier framework would be overkill.

### TypeScript
Strong typing catches bugs at compile time rather than runtime, which is especially useful when working with database results and request payloads that could be anything. It also makes the codebase much easier to navigate knowing exactly what shape a `Device` is throughout the whole codebase, is worth the extra setup cost.

### SQLite (better-sqlite3)
For a project like this, SQLite is the right call. There's no need to run a separate database server, the data is just a file, and `better-sqlite3`'s synchronous API keeps the code straightforward. I specifically chose `better-sqlite3` over the async `sqlite3` package because synchronous database calls in Express don't actually block the event loop in a meaningful way at this scale, and the code is significantly simpler without callbacks or promises for every query.

In production with real traffic I'd swap this out, but for a device management service this is fine.

### Repository Pattern
I separated data access into a `DeviceRepository` interface with a `sqliteDeviceRepository` implementation. The main benefit is testability — in tests I can mock the repository entirely and test controllers in isolation without touching the database. It also means if I ever wanted to swap SQLite for PostgreSQL, I'd only need to write a new implementation of the same interface.

### Unit testing
For unit testing. `ts-jest` lets it compile and run TypeScript files directly without a separate build step. I also set up coverage reporting so I can see exactly which code paths aren't being tested.

---

## API Design

### RESTful routing
I mounted all device routes under `/api/devices` with a dedicated router. This keeps the route definitions clean and makes it easy to add versioning later (e.g. `/api/v2/devices`) without touching the controllers.

### PATCH semantics for update
The update endpoint only applies the fields you send: if you only want to change the `status`, you don't have to send the whole device object.

### Validation layer
I pulled validation logic out into a separate `helpers` module (`validateName`, `validateType`, etc.) rather than putting it inline in the controllers. This means the same validation rules are reused across both `createDevice` and `updateDevice`, and they're easy to unit test in isolation.

### Error handling middleware
Rather than handling errors in every controller individually, I pass them to `next(err)` and let a centralised error handler in `app.ts` deal with them. This keeps controllers clean and ensures errors are handled consistently — all unhandled errors return a `500` with the same shape.

### UUID for IDs
I used UUIDs rather than auto-incrementing integers because they're globally unique. This means IDs won't collide if devices are ever created across multiple instances, and they don't expose information about how many devices exist in the system.

## What I'd Improve

### Authentication & authorisation
Right now the API is completely open. I'd add JWT-based authentication so only authorised clients can manage devices. Role-based access control would also be useful: read-only access for some clients, full access for others.

### Pagination and filtering on list endpoint
The `GET /devices` endpoint returns everything with no limit. With a large number of devices this would be slow and wasteful. I'd add pagination (`?page=1&limit=20`) and filtering by type, status, or location.

### Switch to PostgreSQL for production
SQLite is fine for development and low-traffic deployments, but for anything serious I'd use PostgreSQL. It handles concurrent writes properly, supports more advanced queries, and integrates well with connection pooling.

### Integration tests
The current tests are all unit tests with the repository mocked. I'd add a suite of integration tests that run against a real SQLite test database to catch issues at the database layer — things like constraint violations, migration problems, and query correctness.

### API versioning
I'd version the API from the start with a `/v1/` prefix. Once clients start depending on the API, making breaking changes without versioning is painful.

### Environment-based configuration
Things like the port and database path are hardcoded or rely on `process.env` without any validation. I'd use a config module that reads from environment variables with proper defaults and fails fast on startup if required values are missing.

### Docker
I'd add a `Dockerfile` and `docker-compose.yml` so the API can be run anywhere without having to install Node or worry about the environment. Especially useful when working in a team.
