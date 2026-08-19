
import mongoose from "mongoose";

let cmSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,

    },
     communityId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Community',
        required:true
     },
     joinedAT:{
        type:Date,
        default:Date.now
     }
})

cmSchema.index(
    {userid:1,community_id:1}
)


export const cMember =mongoose.model("Community_Member",cmSchema);