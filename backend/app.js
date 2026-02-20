import express from 'express'
import dotnenv from 'dotenv'
dotnenv.config()
import cookieParser from 'cookie-parser'
import cors from 'cors'
import conn from './config/dbConfig.js'
import authRoute from "./routes/authRoute.js"
import empRoute from "./routes/empRoute.js";
import path from 'path'
import { fileURLToPath } from "url";

conn();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173"
}))
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/auth", authRoute);
app.use("/api/employees", empRoute);

app.get("/",(req,res)=>{
    res.send("Hello")
})

const PORT = process.env.PORT || 8000
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})