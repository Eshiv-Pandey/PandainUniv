const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const User_Schema=new Schema({
  username:{
    type:String,
    required:false,
  },
  email:{
    type:String,
    required:false,
  },
});

const User=mongoose.model("User",User_Schema);
module.exports=User;