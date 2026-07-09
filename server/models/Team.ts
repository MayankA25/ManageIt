import mongoose, { Schema } from "mongoose";
import slugify from "slugify";



const teamSchema = new Schema({

    teamLead: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },

    teamName: {
        type: String,
        required: true
    },

    teamSlug: {
        type: String,
        unique: true
    },

    region: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Region'
    },

    members: {
        type: Number,
        required: true
    },

    teamLogo: {
        type: String
    }
});

teamSchema.pre("save", function(){
    if(!this.teamSlug){
        const teamName = this.teamName;
        const teamNameSlug = slugify(teamName);

        const suffix = this._id.toString().slice(6);

        return `${teamNameSlug}-${suffix}`;
    }
})

export const Team = mongoose.model("Team", teamSchema);