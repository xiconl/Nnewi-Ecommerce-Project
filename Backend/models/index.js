import mongoose from "mongoose";
const { Schema } = mongoose;


const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
    },
    password: {
        type:String,
        required:true,
    }
},
{timestamps: true}); 

const userModel = mongoose.model("userModel", userSchema);
export { userModel };
