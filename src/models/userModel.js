import mongoose from "mongoose";
import dbconnection from "../config/db.js";

const userSchema =new mongoose.Schema( {
    username:{
        required:true,
        type:String,
        maxlength:20,
        unique:true
    },

    password:{
        required:true,
        type:String,
        
    },

    bio:{
        required:true,
        type:String,
        maxlength :300
    },
    
    
},
{
        timestamps:true
    }
)


export let User = mongoose.model("User",userSchema);