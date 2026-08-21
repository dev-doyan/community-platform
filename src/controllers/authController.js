import { User } from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"



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




//login

export const login=async(req,res)=>{
    try {
        const{username,password}=req.body;
     if(!username || !password){
return res.status(400).json({message:"missing fields"});

     }

const matchuser=await User.find({username});     //returns an array

if(matchuser.length==0){
    return res.status(404).json({message:"user not found with the user name "});
}

const passmatch=  await bcrypt.compare(password,matchuser[0].password);

if(!passmatch){
return res.status(401).json({message:"wrong paasssowrd"})
}

const refreshtoken=jwt.sign({id:matchuser[0]._id},process.env.JWT_SECRET,{expiresIn:"7d"}); // refresh token

const accesstoken=jwt.sign({id:matchuser[0]._id},process.env.JWT_SECRET,{expiresIn:"1d"}); // accesstoken token

//storing in cookie 

res.cookie("refreshtoken",refreshtoken,
    {

                httpOnly: true,

                secure: false,

                

                maxAge: 7 * 24 * 60 * 60 * 1000

            }
)


res.cookie("accesstoken",accesstoken,
            {

                httpOnly: true,

                secure: false,

                

                maxAge: 1* 24 * 60 * 60 * 1000

            }
        )




return res.status(200).json({success:true ,message:"login successfull",username:matchuser[0].username})



    } catch (error) {
        return res.status(500).json({mssg:error.message})
    }
}