// Import express, dotenv and cors
import express from "express";
import dotenv from "dotenv";
import cors from "cors"

// Create app object, config dotenv and use cors
const app = express();
dotenv.config();
app.use(cors())

// Sample database
const facts = [
  { id: 1, content: "JavaScript is a single-threaded, non-blocking, asynchronous language." },
  { id: 2, content: "The Earth revolves around the Sun once every 365.25 days." },
  { id: 3, content: "HTML stands for HyperText Markup Language." },
  { id: 4, content: "CSS is used to style and layout web pages." },
  { id: 5, content: "MongoDB is a NoSQL database that stores data in JSON-like documents." }
];

// Create routes
app.get("/", (req, res)=>{
   res.send(`<h1>Hello,This is home page</h1>`);
})
app.get("/login",(req,res)=>{
   res.send("This is login page");
})
app.get("/api/facts",(req, res)=>{
   res.send(facts);
})

// Listen to Port
const port = process.env.PORT || 3000; // We

app.listen(port, ()=>{
   console.log("Server is running at port 3000");
})