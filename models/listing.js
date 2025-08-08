const mongoose=require("mongoose");
const Schema = mongoose.Schema

const Application =new Schema({
  University:{
    type:String,
    required:true,
  },
  Program:{
    type:String,
    required:true,
  },

  Degree:{
    type:String,
    reqired:true,
  },

  Season:{
    type:String,
    required:true,
  },

  Status:{
    type:String,
    required:true,
  },

  Date:{
    type:Date,
    required:true,
  },

  GPA:{
    type:Number,
    required:true,
  },
  General_GRE:{
    type:Number,
    required:true,
  },

  Verbal_GRE:{
    type:Number,
    required:true,
  },

  Aw_GRE:{
    type:Number,
    required:true,
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  }
});

const Apply=mongoose.model("Apply",Application);
module.exports=Apply;