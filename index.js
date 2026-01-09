// Basic Server 
// Import express
import express from "express";

// Create app object
const app = express();

// Create routes
// Home page
app.get("/", (req, res)=>{
   res.send(`<h1>Hello,This is home page</h1>`);
})
// Login page
app.get("/login",(req,res)=>{

})
// Listen
const port = 3000;

app.listen(port, ()=>{
   console.log("Server is running at port 3000");
})