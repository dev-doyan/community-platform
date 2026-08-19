import express from "express"
import { User } from "./models/userModel.js";
import dbconnection from "./config/db.js"
import dotenv from "dotenv"
dotenv.config();
const app = express();

const port =process.env.PORT

//middlewear
app.use(express.json())

// //testing 
// app.post("/",async(req,res)=>{
//     const {username,password,bio}=req.body;
//  const user=await User.create({
//     username,
//     password,
//     bio
// });
// console.log(user);
// res.json({message:"syccess"})

// })

app.listen(`${port}`,()=>{
    console.log(`server connected  with port ${port}`);
    dbconnection();
})


