import mongoose, { Schema } from "mongoose";


const employeeSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true
    },
    region: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Region'
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    },
    role: {
        type: String
    },
    status: {
        enums: ["ACTIVE", "SUSPENDED", "TERMINATED"],
        required: true
    }
}, { timestamps: true });

export const Employee = mongoose.model("Employee", employeeSchema);