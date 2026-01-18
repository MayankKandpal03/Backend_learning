import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser" 
const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit:"16kb"})); // Parses incoming requests with JSON payloads. Converts JSON body into req.body.
app.use(express.urlencoded({extended:true, limit:"16kb"})); // Parses form data sent using application/x-www-form-urlencoded. extended: true allows parsing nested objects.
app.use(express.static('public')); // Serves static files like images, CSS, JS from the public folder.
app.use(cookieParser()); // Parses cookies from incoming HTTP requests. Makes cookies available as req.cookies. Required for authentication systems using JWT/session stored in cookies.

export default app;