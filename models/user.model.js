import mongoose from "mongoose";

// Define the User schema (structure of User documents in MongoDB)
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,      // Data type of the field
        trim: true,       // Removes leading and trailing spaces
        required: true    // Field must be provided
    },
    lastName: {
        type: String      // Optional field (not required)
    },
    gender: {
        type: String,     // Stores gender as string
        enum: ["Male", "Female"], // Only these two values are allowed
        required: true
    },
    age: {
        type: Number,     // Stores age as number
        required: true
    },
    username: {
        type: String,
        unique: true,     // Ensures no two users have the same username (creates unique index)
        lowercase: true,  // Converts value to lowercase before saving
        trim: true        // Removes extra spaces
    },
    email: {
        type: String,
        required: true,
        unique: true,     // Ensures email is unique (also creates index for fast retrieval)
        lowercase: true,  // Converts email to lowercase
        trim: true        
    },
    passwordHash: {       // Stores encrypted password, not plain text
        type: String,     
        required: true,
        trim: true
    },
    avatar:{
        type:String,
        default: null
    },
    videosUploaded: [
        {
            type: mongoose.Schema.Types.ObjectId, // Stores ObjectId of Video documents
            ref: "Video"  // References the Video model for population
        }
    ]
}, {
    timestamps: true     // Automatically adds createdAt and updatedAt fields
});

// Create the User model
// "User" will be pluralized to "users" and stored as a collection in MongoDB
const User = mongoose.model("User", userSchema);

export default User;