import mongoose, { Schema } from "mongoose";
import slugify from "slugify";

const regionSchema = new Schema({
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true
    },

    regionHR: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    regionName:{
        type: String,
        required: true,
        unique: true
    },

    regionSlug: {
        type: String,
        required: true,
        unqiue: true
    }
})

regionSchema.pre("save", async function (){
    if(!this.regionSlug){
        const regionName = this.regionName;
        const suffix = this._id.toString().slice(6);

        this.regionSlug = `${slugify(regionName, {
            lower: true,
            strict: true
        })}-${suffix}`;
    }
})