import mongoose from "mongoose";

const joinRequestSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    community: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Community",
        required: true
    },
    reqStatus:{
        type:String,
        enum:["pending","accepted","rejected"],
        default:"pending"

    },

    requestedAt: {
        type: Date,
        default: Date.now
    }
});

joinRequestSchema.index(
    { user: 1, community: 1 },
    { unique: true }
);

export const JoinRequest = mongoose.model(
    "JoinRequest",joinRequestSchema
);