# COMP-3018 Assignment 5 — Documentation and Security

## Project Overview

This project is an API for managing events, built with Node.js, Express, and TypeScript, backed by a Firebase Firestore database. It has endpoints to create, retrieve, update, and delete events, each with strict input validation, structured JSON responses, and security hardening through CORS and Helmet middleware.

The API solves the problem of managing event data in a structured and validated way, removing the need for manual database operations. It is intended for developers building front-end clients or integrating event management into a larger application, providing a clean and documented interface with consistent error handling and response shapes.

---

## Installation Instructions

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher
- A **Firebase project** with Firestore enabled and a service account key

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/andreianoling/COMP-3018-Assignment-3.git
   cd COMP-3018-Assignment-3
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the project root. Use the following as a template:
   ```env
   NODE_ENV=development
   PORT=3000
   FIREBASE_PROJECT_ID=your-firebase-project-id
   FIREBASE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
   SWAGGER_SERVER_URL=http://localhost:3000/api/v1
   ```

   - `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, and `FIREBASE_PRIVATE_KEY` come from your Firebase service account JSON file (Firebase Console → Project Settings → Service Accounts → Generate new private key).
   - `ALLOWED_ORIGINS` is only enforced in production. Set it to a comma-separated list of allowed front-end origins.

4. **Start the server**
   ```bash
   npm start
   ```

   The server will start on `http://localhost:3000` by default.

---

## API Documentation

**Hosted docs:** [https://andreianoling.github.io/COMP-3018-Assignment-3/](https://andreianoling.github.io/COMP-3018-Assignment-3/)

**Local Swagger UI:** When running locally, access the interactive API documentation at [http://localhost:3000/api-docs](http://localhost:3000/api-docs).

---

## API Request Examples

All requests and responses use `Content-Type: application/json`.

### 1. Create an Event

**Request**
```
POST http://localhost:3000/api/v1/events
Content-Type: application/json
```
```json
{
  "name": "Test Workshop",
  "date": "2026-08-01T10:00:00Z",
  "capacity": 50,
  "category": "workshop"
}
```

**Response** `201 Created`
```json
{
  "message": "Event created",
  "data": {
    "newPost": {
      "id": "abc123",
      "name": "Node.js Workshop",
      "date": "2026-08-01T10:00:00.000Z",
      "capacity": 50,
      "registrationCount": 0,
      "status": "active",
      "category": "workshop",
      "createdAt": "2026-03-31T12:00:00.000Z",
      "updatedAt": "2026-03-31T12:00:00.000Z"
    }
  }
}
```

---

### 2. Get All Events

**Request**
```
GET http://localhost:3000/api/v1/events
```

**Response** `200 OK`
```json
{
  "message": "Events retrieved",
  "count": 2,
  "data": {
    "posts": [
      {
        "id": "abc123",
        "name": "Node.js Workshop",
        "date": "2026-08-01T10:00:00.000Z",
        "capacity": 50,
        "registrationCount": 0,
        "status": "active",
        "category": "workshop",
        "createdAt": "2026-03-31T12:00:00.000Z",
        "updatedAt": "2026-03-31T12:00:00.000Z"
      },
      {
        "id": "def456",
        "name": "Tech Conference 2026",
        "date": "2026-09-15T09:00:00.000Z",
        "capacity": 200,
        "registrationCount": 45,
        "status": "active",
        "category": "conference",
        "createdAt": "2026-03-28T08:00:00.000Z",
        "updatedAt": "2026-03-29T10:00:00.000Z"
      }
    ]
  }
}
```

---

### 3. Update an Event

**Request**
```
PUT http://localhost:3000/api/v1/events/abc123
Content-Type: application/json
```
```json
{
  "capacity": 75,
  "status": "cancelled"
}
```

**Response** `200 OK`
```json
{
  "message": "Event updated",
  "data": {
    "updatedPost": {
      "id": "abc123",
      "name": "Node.js Workshop",
      "date": "2026-08-01T10:00:00.000Z",
      "capacity": 75,
      "registrationCount": 0,
      "status": "cancelled",
      "category": "workshop",
      "createdAt": "2026-03-31T12:00:00.000Z",
      "updatedAt": "2026-03-31T13:00:00.000Z"
    }
  }
}
```

---

### 4. Delete an Event

**Request**
```
DELETE http://localhost:3000/api/v1/events/abc123
```

**Response** `200 OK`
```json
{
  "message": "Event deleted"
}
```

---

### Validation Error Example

If required fields are missing or invalid, the API returns:

**Response** `400 Bad Request`
```json
{
  "error": "Validation error: \"name\" is required, \"capacity\" must be greater than or equal to 5"
}
```
 