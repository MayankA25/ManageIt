import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        required: function(){
            return this.type == "oauth"
        }
    },
    type: {
        type: String,
        enum: ["oauth", "credentials"],
        required: true
    },
    password: {
        type: String,
        required: function (){
            return this.type == "credentials"
        },
        validate: {
            validator: function (value: string){
                if(this.type == "credentials"){
                    return !!value;
                }

                return value === undefined;
            },
            message: "Password field is not allowed for google users."
        }
    },
    // organization: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Organization',
    //     required: true
    // },
    // skills: [{
    //     type: String
    // }],
    // careerTimeline:[{
    //     organization: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'Organization'
    //     },
    //     role: {
    //         type: String
    //     },
    //     startDate: {
    //         type: Date
    //     },
    //     endDate: {
    //         type: Date
    //     }
    // }]
    // documents: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Document'
    // }],


});


export const User = mongoose.model('User', userSchema);
