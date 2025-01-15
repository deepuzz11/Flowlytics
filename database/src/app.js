import dotenv from "dotenv";
import express from "express"
import dataConnection from './db/db.js';
dotenv.config();
//db Xonnection
const myApp = express();
dataConnection()
const port = process.env.PORT
myApp.listen((port),()=> {
    console.log(`server is running fine at port ${port}`)
})