import mongoose from "mongoose";
import dbconnection from "../config/db.js";

let communitySchema = new  mongoose.Schema({
    name:{
        required:true,
        type:String,
        maxlength:30,
        unique:true
    },
    description:{
       
        type:String,
        maxlength:100,
        
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    }

}
,{
    timestamps:true
}

)


export const Community= mongoose.model("Community",communitySchema);