import express from "express"
import dotenv from "dotenv"
import connectionDB from "./db/connectDB.js";

dotenv.config()

connectionDB()
.then(()=>{
    app.listen(process.env.PORT,()=> console.log("Server is running"))
})
.catch((err)=> {
    console.log("MongoDB connection failed:", err);
})