# Level 02: Database Setup, app.js Setup, Error Handler and Api response file created

## 2. Files (what changed / what to review)

* **`index.js`** — Application entry point. Loads environment, connects to MongoDB, and starts the server. **Known issue:** this file currently re-declares `app` after importing it. Remove the extra `const app = express();` and use the imported `app` instead.

* **`.env`** — Stores environment variables (not checked in). Example keys described below.

* **`constants.js`** — Project constants (e.g., `DB_NAME`). Keep config-like values here.

* **`db/connectionDB.js`** — Connects to MongoDB using `mongoose.connect()`. Exits process on failure.

* **`app.js`** — Configures the Express application and global middlewares (CORS, body parsers, static files, cookie parser).

* **`utils/errorHandler.js`** — `AppError` custom error class and `asyncWrap` helper to catch async errors in controllers.

* **`utils/apiResponse.js`** — `ApiResponse` class to standardize controller responses.

---

# Database Setup

---

### 1. `.env`

This file contains environment variables.

- We store the MongoDB connection string here.
- Example:
    
    ```
    MONGODB_URI=mongodb://localhost:27017
    ```
    

---

### 2. `constants.js`

This file is used to store constant values that are reused across the project.

```jsx
export const DB_NAME = "student_db"; // Name of the database
```

---

### 3. `db/connectionDB.js`

This file contains the database connection logic.

Steps:

1. Import `mongoose` and `DB_NAME`.
2. Create an asynchronous function to connect to MongoDB.
3. Use `mongoose.connect()` with `URI + database name`.
4. Handle errors and stop the server if the connection fails.
5. Export the function.

```jsx
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectionDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`); // We used backticks to write Database's => URI + / + Database_name
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process if DB connection fails
  }
};

export default connectionDB;
```

---

# `app.js`

- `app.js` is used to **configure and initialize the Express application**.
- It defines how your server behaves before it starts listening for requests.
- All global middlewares are placed here:
    - CORS
    - Body parser
    - URL encoding
    - Static file serving
    - Cookies
    - Security, rate limiters, etc.

```jsx
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser" 
const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true, limit:"16kb"}));
app.use(express.static('public'));
app.use(cookieParser());

export default app;
```

---

# Error Handler

This file is stored inside utils and it used to handle app errors and async errors using a global middleware

```jsx
// Error handler file to handle app error and async error

// Custom App error class
export class AppError extends Error {
    constructor(
        message, 
        statusCode,
        errors=[],
        stack = ""
    ){
    super(message);               
    this.status = statusCode;
    this.message = message;
    this.data = null;
    this.success = false;
    this.errors = errors;
    this.isOperational = true; // Helps avoid server crashes and marks the error expected
    if(stack){
        this.stack =stack
    }
    else{
        Error.captureStackTrace(this, this.constructor); // To make debugging easier and make stack trace clean and readable
    }
  }
}

// Async error handler -> Async wrap
export const asyncWrap = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next))
        .catch(next);
}};

```

# API Response

`ApiResponse` is used to send a **uniform response structure** from all controllers

```jsx
class ApiResponse {
    constructor(statusCode, data, message = "Success"){
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode<400
		    Object.freeze(this); // makes response immutable
    }
}
export default ApiResponse
```

### `index.js`

This is the main entry file of the application.

```jsx
import express from "express";
import dotenv from "dotenv";
import app from "./app.js"
import connectionDB from "./db/connectionDB.js";

dotenv.config();

connectionDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server is running on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.error("Failed to start server due to DB error:", error);
  });
```