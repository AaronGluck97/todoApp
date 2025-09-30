# Todo Backend API

A robust RESTful API for managing todo items, built with **Node.js**, **Express**, **TypeScript**, and **SQLite**. Features a clean 3-layer architecture with Controllers, Intents (business logic), and Data Access Layer (DAL).

## 🚀 Features

- ✅ **Full CRUD operations** for todo items
- 🏗️ **3-layer architecture** (Controllers → Intents → DAL)
- 🔒 **Type-safe** with TypeScript
- 📊 **SQLite database** with automatic setup
- 🔄 **Async/await** throughout
- 🛡️ **Input validation** and error handling
- 📝 **Clean separation of concerns**
- 🧪 **Easy to test** modular design

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Scripts](#scripts)
- [API Documentation](#api-documentation)
- [Architecture](#architecture)
- [Environment Variables](#environment-variables)
- [Database Schema](#database-schema)
- [Error Handling](#error-handling)
- [Development](#development)

## 🏁 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone and navigate to the project:**
   ```bash
   cd todo-be
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build the project:**
   ```bash
   npm run build
   ```

4. **Start the server:**
   ```bash
   npm start
   ```

The server will start on `http://localhost:3001` by default.

## 📜 Scripts

| Script | Command | Description |
|--------|---------|-------------|
| **Build** | `npm run build` | Compile TypeScript to JavaScript |
| **Start** | `npm start` | Start the production server |
| **Dev** | `npm run dev` | Start development server with ts-node |
| **Dev Watch** | `npm run dev:watch` | Start development server with auto-reload |

### Script Details

```bash
# Development (recommended for local development)
npm run dev:watch    # Auto-reloads on file changes

# Development (single run)
npm run dev         # Runs once with ts-node

# Production
npm run build       # Compile TypeScript
npm start          # Run compiled JavaScript
```

## 📡 API Documentation

### Base URL
```
http://localhost:3001/api
```

### Health Check
```http
GET /
```
**Response:**
```json
{
  "message": "Todo API Server is running!"
}
```

---

## 📝 Todo Endpoints

### 1. Get All Todos
```http
GET /api/todos
```

**Description:** Retrieve all todo items ordered by creation date (newest first).

**Response:**
```json
[
  {
    "id": 1,
    "text": "Sample todo item",
    "completed": false,
    "created_at": "2025-01-15T10:30:00.000Z",
    "updated_at": "2025-01-15T10:30:00.000Z"
  },
  {
    "id": 2,
    "text": "Another todo item",
    "completed": true,
    "created_at": "2025-01-15T09:15:00.000Z",
    "updated_at": "2025-01-15T11:45:00.000Z"
  }
]
```

**Status Codes:**
- `200 OK` - Success
- `500 Internal Server Error` - Server error

---

### 2. Get Todo by ID
```http
GET /api/todos/:id
```

**Description:** Retrieve a specific todo item by its ID.

**Parameters:**
- `id` (number) - Todo ID

**Example:**
```http
GET /api/todos/1
```

**Response:**
```json
{
  "id": 1,
  "text": "Sample todo item",
  "completed": false,
  "created_at": "2025-01-15T10:30:00.000Z",
  "updated_at": "2025-01-15T10:30:00.000Z"
}
```

**Status Codes:**
- `200 OK` - Success
- `400 Bad Request` - Invalid todo ID
- `404 Not Found` - Todo not found
- `500 Internal Server Error` - Server error

---

### 3. Create New Todo
```http
POST /api/todos
```

**Description:** Create a new todo item.

**Request Body:**
```json
{
  "text": "Sample todo item"
}
```

**Request Schema:**
```typescript
{
  text: string  // Required, non-empty string
}
```

**Response:**
```json
{
  "id": 3,
  "text": "Sample todo item",
  "completed": false,
  "created_at": "2025-01-15T12:00:00.000Z",
  "updated_at": "2025-01-15T12:00:00.000Z"
}
```

**Status Codes:**
- `201 Created` - Todo created successfully
- `400 Bad Request` - Invalid input (missing or empty text)
- `500 Internal Server Error` - Server error

---

### 4. Update Todo
```http
PUT /api/todos/:id
```

**Description:** Update an existing todo item's text and/or completion status.

**Parameters:**
- `id` (number) - Todo ID

**Request Body:**
```json
{
  "text": "Updated todo text",
  "completed": true
}
```

**Request Schema:**
```typescript
{
  text?: string     // Optional, non-empty string
  completed?: boolean  // Optional, boolean
}
```

**Note:** At least one field (`text` or `completed`) must be provided.

**Response:**
```json
{
  "id": 1,
  "text": "Updated todo text",
  "completed": true,
  "created_at": "2025-01-15T10:30:00.000Z",
  "updated_at": "2025-01-15T12:15:00.000Z"
}
```

**Status Codes:**
- `200 OK` - Todo updated successfully
- `400 Bad Request` - Invalid input or no fields to update
- `404 Not Found` - Todo not found
- `500 Internal Server Error` - Server error

---

### 5. Delete Todo
```http
DELETE /api/todos/:id
```

**Description:** Delete a todo item by its ID.

**Parameters:**
- `id` (number) - Todo ID

**Example:**
```http
DELETE /api/todos/1
```

**Response:** No content (empty response body)

**Status Codes:**
- `204 No Content` - Todo deleted successfully
- `400 Bad Request` - Invalid todo ID
- `404 Not Found` - Todo not found
- `500 Internal Server Error` - Server error

---

## 🏗️ Architecture

### 3-Layer Architecture

```
┌─────────────────┐
│   Controllers   │  ← HTTP handling, validation
└─────────────────┘
         │
┌─────────────────┐
│     Intents     │  ← Business logic, orchestration
└─────────────────┘
         │
┌─────────────────┐
│      DAL        │  ← Data access, database operations
└─────────────────┘
         │
┌─────────────────┐
│    Database     │  ← SQLite storage
└─────────────────┘
```

### Project Structure

```
src/
├── controllers/          # HTTP request handlers
│   └── Todo.controller.ts
├── intents/             # Business logic layer
│   ├── TodoIntent.ts
│   └── index.ts
├── dal/                 # Data access layer
│   ├── TodoDAL.ts
│   └── index.ts
├── types/               # TypeScript interfaces
│   └── todo.ts
├── db/                  # Database connection
│   └── database.ts
└── server.ts            # Express server setup
```

---

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=3001

# Database Configuration (optional)
DB_PATH=./todos.db
```

**Default Values:**
- `PORT`: 3001
- `DB_PATH`: `./todos.db` (SQLite database file)

---

## 🗃️ Database Schema

### `todos` Table

```sql
CREATE TABLE todos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  text TEXT NOT NULL,
  completed BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

**Fields:**
- `id`: Auto-incrementing primary key
- `text`: Todo item text (required)
- `completed`: Completion status (boolean, default: false)
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp

---

## 🚨 Error Handling

### Error Response Format

All errors return a consistent JSON format:

```json
{
  "error": "Error message description"
}
```

### Common Error Messages

| Status | Message | Description |
|--------|---------|-------------|
| 400 | `"Invalid todo ID"` | ID parameter is not a valid number |
| 400 | `"Text is required and must be a non-empty string"` | Missing or empty text field |
| 400 | `"Text must be a non-empty string"` | Invalid text format |
| 400 | `"Completed must be a boolean"` | Invalid completed field type |
| 400 | `"No fields to update"` | No valid fields provided for update |
| 404 | `"Todo not found"` | Todo with specified ID doesn't exist |
| 500 | `"Internal server error"` | Generic server error |

---

## 🧪 Development

### Code Quality

The project uses:
- **TypeScript** for type safety
- **3-layer architecture** for clean separation
- **Async/await** for better error handling
- **Input validation** on all endpoints
- **Consistent error responses**

### Testing the API

You can test the API using curl, Postman, or any HTTP client:

```bash
# Get all todos
curl http://localhost:3001/api/todos

# Create a new todo
curl -X POST http://localhost:3001/api/todos \
  -H "Content-Type: application/json" \
  -d '{"text": "Sample todo item"}'

# Update a todo
curl -X PUT http://localhost:3001/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"text": "Updated todo text", "completed": true}'

# Delete a todo
curl -X DELETE http://localhost:3001/api/todos/1
```

### Database Management

The SQLite database is automatically created on first run with sample data. The database file (`todos.db`) is stored in the project root.

---

## 📚 API Client Examples

### JavaScript/Fetch

```javascript
// Get all todos
const todos = await fetch('/api/todos').then(res => res.json());

// Create todo
const newTodo = await fetch('/api/todos', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ text: 'Sample todo item' })
}).then(res => res.json());

// Update todo
const updatedTodo = await fetch('/api/todos/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ completed: true })
}).then(res => res.json());

// Delete todo
await fetch('/api/todos/1', { method: 'DELETE' });
```

### TypeScript Types

```typescript
interface Todo {
  id: number;
  text: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

interface CreateTodoRequest {
  text: string;
}

interface UpdateTodoRequest {
  text?: string;
  completed?: boolean;
}
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 📄 License

This project is licensed under the ISC License.
