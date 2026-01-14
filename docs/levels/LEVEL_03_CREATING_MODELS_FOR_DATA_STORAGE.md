# Level 03 : Create User schema and model

## Commit message
Create User schema and model for MongoDB using Mongoose

---

## Files changed / added
- `models/user.model.js` (added)

---

## Purpose of this commit
- Introduce a persistent `User` data model for the application.  
- Enforce validation and constraints for user documents.  
- Provide relations to `Video` documents and automatic timestamps.  
- Enable safe CRUD operations and simplify authentication and profile logic.

---


### Role
Defines the Mongoose schema and model for `User`. Serves as the single source of truth for user data, enforces validation, and exposes relations to related collections (for example, `Video`).

---

## 1. Purpose
Define and enforce the shape, validation, and relations for `User` documents stored in MongoDB. The model provides data constraints, relationships to `Video`, and timestamps for lifecycle tracking.

**File path:** `models/user.model.js`

---

## 2. Schema (summary)

| Field            | Type         | Constraints                                 | Purpose                                 |
|-----------------:|-------------:|---------------------------------------------|-----------------------------------------|
| `firstName`      | `String`     | `trim`, `required`                          | User first name                         |
| `lastName`       | `String`     | optional                                    | User last name                          |
| `gender`         | `String`     | `enum: ["Male","Female"]`, `required`       | Restricted gender values                |
| `age`            | `Number`     | `required`                                  | User age                                |
| `username`       | `String`     | `unique`, `lowercase`, `trim`               | Public unique handle                    |
| `email`          | `String`     | `required`, `unique`, `lowercase`, `trim`   | Login / contact                         |
| `passwordHash`   | `String`     | `required`, `trim`                          | Hashed password only (never plain text) |
| `avatar`         | `String`     | `default: null`                             | Path or URL to profile image            |
| `videosUploaded` | `ObjectId[]` | `ref: "Video"`                              | References to `Video` documents         |

Schema option: `timestamps: true` (adds `createdAt`, `updatedAt`).

---

## 3. Indexes & constraints
- Unique indexes: `username`, `email` (duplicate key errors must be handled).
- `gender` uses an enum to restrict allowed values.
- Modern Mongoose creates indexes automatically; adjust settings for older versions if needed.

---

## 4. Security & validation notes
- **Passwords:** Hash using `bcrypt` or `argon2` before saving. Store only the hash in `passwordHash`.
- **Never expose** `passwordHash` in API responses — use `.select('-passwordHash')` or DTOs.
- Add application-level validation for `email` format, `age` range, and username length.

---

## 5. Relations & population
- `videosUploaded` stores ObjectId references to `Video`.
- Example populate:
```js
const user = await User.findById(userId).populate('videosUploaded').lean();
