import { User } from "../models/userModel.js"
import bcrypt from "bcrypt"



export const register=async(req,res)=>{


    try {
        const{username,password,bio}=req.body;
if(!username || !bio || !password){
    return res.status(400).json({message:"Your fields are not complete"})
}

const existinguser= await User.findOne({username});

if(existinguser){
    return res.status(400).json({message:"user already exist"})
}

const hashedpass= await bcrypt.hash(password,5);

const user = await User.create({
    username,
    password:hashedpass,
    bio

});

return res.status(200).json({message:"user created",username:user.username});





    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}