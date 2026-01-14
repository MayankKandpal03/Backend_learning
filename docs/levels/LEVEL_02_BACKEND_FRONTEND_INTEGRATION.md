# Level 02: Backend–Frontend Integration Using CORS

## Commit Overview

**Commit message:** Backend–frontend integration using CORS  
**Commit hash:** `ff304ac0b0ee324934ef11524b25bf799657a073`  
**Commit link:**  
https://github.com/MayankKandpal03/Backend_learning/commit/ff304ac0b0ee324934ef11524b25bf799657a073

**Scope:** Backend + Frontend  
**Files changed:**
- `index.js`
- `App.jsx`
- `vite.config.js`

---

## Purpose of This Commit

This commit integrates the **backend and frontend** so that they can communicate with each other.

It introduces:
- API-based data sharing
- CORS handling
- Proxy-based frontend requests

This level marks the transition from a **backend-only project** to a **full-stack application**.

---

## Files Introduced / Modified

### 1. `index.js` (Backend entry file)

**Role of this file:**
- Configures middleware (CORS, environment variables)
- Defines API routes
- Exposes backend data to the frontend
- Starts the server

---

### 2. `App.jsx` (Frontend entry component)

**Commit link for frontend: **
https://github.com/MayankKandpal03/Backend_learning_Frontend_part/commit/abe6c25995ec9825ce3218956d463ebe78497bfb

**Role of this file:**
- Fetches data from the backend API
- Stores data in component state
- Renders backend data in the UI

---

### 3. `vite.config.js` (Frontend configuration)

**Role of this file:**
- Defines a proxy for backend API requests
- Prevents CORS issues during development