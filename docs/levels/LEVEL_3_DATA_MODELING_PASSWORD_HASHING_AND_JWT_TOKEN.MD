# Level 03: Data Modeling - User and Video Schemas

## Files (what changed / what to review)

* **`models/user.model.js`** — Defines the User structure. Includes JWT token generation, password hashing middleware, and watch history tracking.
* **`models/video.model.js`** — Defines the Video structure. Handles video metadata, view counts, and relationships to the User model.

---

# User Model

The `User` model handles user authentication, profile data, and history. It uses `bcrypt` for security and `jwt` for session management.

### 1. Schema Structure

The schema enforces strong validation on fields like `username` and `email` to ensure unique and clean data.

* **Identifiers**: `username` and `email` are unique, trimmed, and indexed for faster searching.
* **Security**: Stores `passwordHash` instead of plain text passwords.
* **History**: `watchHistory` is an array of ObjectIds referencing the `Video` model.

```javascript
const userSchema = new mongoose.Schema(
    {
        username: {
             type:String,
             required:true,
             unique:true,
             lowercase:true,
             trim:true,
             index:true
        },
        email: {
             type:String,
             required:true,
             unique:true,
             lowercase:true,
             trim:true,
             index:true, 
             regex:/^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Basic email validation
         },
         // ... fullname, avatar, coverImage, watchHistory
         passwordHash:{
            type:String,
            required:[true,'Password is Required']
         }
    },
    {timestamps: true}
)

```

### 2. Encryption Middleware (Pre-save Hook)

We use a Mongoose `pre` hook to intercept the save process. If the password field is modified, it is hashed using `bcrypt` before being stored in the database.

```javascript
userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next()
    
    this.passwordHash = bcrypt.hash(this.passwordHash, 10)
    next()
})

```

### 3. Custom Methods

The model includes custom methods for authentication and token management:

* **`isPasswordCorrect`**: Compares a user-provided password with the stored hash.
* **`generateAccessToken`**: Generates a short-lived token for API access.
* **`generateRefreshToken`**: Generates a long-lived token to refresh sessions.

```javascript
userSchema.methods.isPasswordCorrect = async function(password){
   return bcrypt.compare(password, this.passwordHash)
}

userSchema.methods.generateAccessToken = function(){
   return jwt.sign(
      {
         _id: this._id,
         email: this.email,
         userName: this.username
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
   )
}

```

---

# Video Model

The `Video` model stores all metadata related to uploaded content. It is designed to work with aggregation plugins for advanced filtering.

### 1. Schema Structure

This schema links the video to its creator via the `owner` field.

* **Metadata**: Stores URLs for `videoFile` and `thumbnail` (likely from a cloud provider like Cloudinary).
* **Stats**: Tracks `views` and `time` (duration).
* **Ownership**: The `owner` field is a reference to the `User` model, allowing us to populate user details when fetching videos.

```javascript
const videoSchema = new mongoose.Schema(
    {
        videoFile: { type:String, required:true },
        thumbnail: { type:String, required:true },
        title: { type:String, required:true },
        description: { type:String, required:true },
        time: { type:Number, required:true },
        views: { type: Number, default:0 },
        isPublished: { type:Boolean, default:true },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {timestamps:true}
)

```

### 2. Aggregation Plugin

The schema utilizes `mongooseAggregatePaginate`. This allows us to perform complex aggregation queries (like filtering videos by owner, sorting by views) while maintaining pagination support.

```javascript
videoSchema.plugin(mongooseAggregatePaginate)

```