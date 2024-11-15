const mongoose=require("mongoose");
const {Schema}=mongoose;

const feedbackSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        required:true,
        min:1,
        max:5,
    },
    date:{
        type:Date,default:Date.now
    }
})

const Feedback=mongoose.model("Feedback",feedbackSchema);
module.exports=Feedback;
