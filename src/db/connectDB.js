// Import
import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

// Write async function to connect to database
// mongoose.connect("https://localhost:27017/database_name")
const connectionDB = async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`) // We used backticks to write Database's => URI + / + Database_name
        console.log("\nMongoDB connected");
    } catch (error) {
        console.log("MongoDB connection error: "+ error);
        process.exit(1)      
    }
}

// Export
export default connectionDB; 