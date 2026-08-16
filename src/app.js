import express from "express"
import dbconnection from "./config/db.js"
import dotenv from "dotenv"
dotenv.config();
const app = express();

const port =process.env.PORT



app.listen(`${port}`,()=>{
    console.log(`server connected  with port ${port}`);
    dbconnection();
})


