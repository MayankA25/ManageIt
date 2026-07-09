import mongoose, { Schema } from "mongoose";
import slugify from "slugify";


const organizationSchema = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },

    slug: {
        type: String,
        unique: true
    },
    website:{
        type: String
    },
    logo: {
        type: String
    },
    contactEmail: {
        type: String
    },
    contactPhone:{
        type: String
    },

    status: {
        enums: [ "PENDING", "ACTIVE", "SUSPENDED", "DEACTIVATED" ]
    },

    trust:{
        score: Number,
        customDomainVerified: Boolean,
        employeeConfirmations: Number
    }
}, { timestamps: true });


organizationSchema.pre("save", async function(){
    if(!this.slug){
        const suffix = this._id.toString().slice(-6);
        
        this.slug = `${slugify(this.name, {
            lower: true,
            strict: true
        })}-${suffix}`;
    }
})

export const Organization = mongoose.model("Organization", organizationSchema);