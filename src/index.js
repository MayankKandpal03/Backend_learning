import dotenv from "dotenv"
import connectionDB from "./db/connectDB.js";
import app from "./app.js";

dotenv.config()

connectionDB()
.then(()=>{
    app.listen(process.env.PORT,()=> console.log("Server is running",process.env.PORT))
})
.catch((err)=> {
    console.log("MongoDB connection failed:", err);
})