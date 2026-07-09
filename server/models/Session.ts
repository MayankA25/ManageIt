import mongoose, { Schema } from "mongoose";


const sessionSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    device: {
        type: String,
        required: true
    },
    ipAddress:{
        type: String,
        required: true
    },
    lastActiveAt:{
        type: Date,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    }
});

sessionSchema.index(
    { expiresAt: 1 },
    { expireAfterSeconds: 0 }
)

export const Session = mongoose.model('Session', sessionSchema);