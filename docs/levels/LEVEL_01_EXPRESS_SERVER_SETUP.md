# Level 01: Express Server Setup

## Commit Overview

**Commit message:** Basic Server Logic  
**Commit hash:** `8edcf6840e3aed009b6eefa0e118475e2e85fa1e`  
**Commit link:**  
[View this commit on GitHub](https://github.com/MayankKandpal03/Backend_learning/commit/8edcf6840e3aed009b6eefa0e118475e2e85fa1e)

---

## Purpose of This Commit

This commit introduces the **Express server setup**, which is the foundation of the backend application.  
It enables the application to start a server and listen for incoming HTTP requests.

---

## Files Introduced / Modified

### 1. `index.js` (or main server file)

**Role of this file:**
- Acts as the entry point of the backend application.
- Initializes the Express application.
- Starts the server on a specific port.

---

## Code Explanation (Step by Step)

1. **Importing Express**
   - Express is imported to create a backend server easily.
   - It abstracts low-level HTTP handling.

2. **Creating the app instance**
   - `express()` is called to create the application object.
   - This object controls routing, middleware, and server behavior.

3. **Defining the port**
   - A port number is assigned for the server to run on.
   - This allows clients (browser, frontend, API tools) to connect.

4. **Starting the server**
   - `app.listen()` is used to start listening for requests.
   - A callback confirms the server is running successfully.

---

## Concepts Introduced in This Level

1. **Express framework**
   - Simplifies backend development in Node.js.

2. **Server lifecycle**
   - Create app → configure → listen on a port.

3. **Entry point design**
   - One central file controls application startup.

---

## Why This Level Is Important

- Every backend application must expose a server.
- This commit transforms the project from:
  - A static setup  
  - Into a **running backend service**
- All future features (routes, middleware, database) depend on this step.

---

## Beginner Notes

- Always keep server startup logic simple.
- Avoid writing business logic in the entry file.
- Use meaningful console logs only for development.
