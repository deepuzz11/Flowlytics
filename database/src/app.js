import dotenv from "dotenv";
import express from "express"
import dataConnection from './db/db.js';
import AllRoutes from "./Routes/index.js";
import cookieParse from "cookie-parser";
import cors from "cors";

dotenv.config();
//db Xonnection
const myApp = express();
// const crosOrigin = {
//     origin : 'http://localhost:5173',
//     methods : ['GET,PUT,POST,PATCH,DELETE'],
//     credentials: true,
// }
myApp.use(cors())
myApp.use(express.json())

myApp.use(AllRoutes)
myApp.use(cookieParse())
dataConnection()
const port = process.env.PORT
myApp.listen((port),()=> {
    console.log(`server is running fine at port ${port}`)
})