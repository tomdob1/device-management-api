# Device Management API

A RESTful API for managing IoT devices, built with Express and SQLite.

## Requirements

- Node.js v20+
- npm

## Setup

```bash
npm install
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Run in development mode with watch (uses ts-node-dev) |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm run build:watch` | Compile in watch mode |
| `npm start` | Run compiled app from `dist/` |
| `npm test` | Run tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run lint` | Lint `src/` and `tests/` |
| `npm run lint:fix` | Lint and auto-fix |

## Endpoints

Base URL: `http://localhost:3000`

### List Devices
```
GET /api/devices/devices/
```
Returns all devices.

### Get Device
```
GET /api/devices/device/:id
```
Returns a single device by ID. Returns `404` if not found.

### Create Device
```
POST /api/devices/
Content-Type: application/json

{
  "name": "Living Room Lamp",
  "type": "light",
  "location": "Living Room"
}
```
Valid types: `alarm`, `camera`, `light`, `lock`, `other`, `sensor`, `switch`, `thermostat`

Returns `201` with the created device, or `400` if validation fails.

### Update Device
```
PATCH /api/devices/device/:id
Content-Type: application/json

{
  "name": "Updated Name",
  "status": "on"
}
```
All fields are optional — only provided fields are updated (PATCH semantics).

Valid statuses: `on`, `off`

Returns the updated device, or `404` if not found.

### Delete Device
```
DELETE /api/devices/device/:id
```
Returns `{ "message": "Device deleted" }`, or `404` if not found.

## Device Schema

```json
{
  "id": "uuid",
  "name": "string",
  "type": "alarm | camera | light | lock | other | sensor | switch | thermostat",
  "status": "on | off",
  "location": "string",
  "createdAt": "ISO 8601 timestamp",
  "updatedAt": "ISO 8601 timestamp"
}
```

## Testing

A Postman collection is included at `device-management-api.postman_collection.json`. Import it into Postman or Bruno (File → Import → Postman).
