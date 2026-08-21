import express from "express"
import { User } from "./models/userModel.js";
import dbconnection from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import dotenv from "dotenv"
dotenv.config();
const app = express();

const port =process.env.PORT

//middlewear
app.use(express.json())

//routes
app.use("/api/v1/auth",authRoutes);

app.listen(`${port}`,()=>{
    console.log(`server connected  with port ${port}`);
    dbconnection();
})


