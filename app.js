const express=require("express");
const app=express();
const port=1111;
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const Apply=require("./models/listing.js");
const User=require("./models/User.js");
const getunivimage=require("./utils/getunivimage.js");
app.locals.getunivimage=getunivimage;



app.listen(port,()=>{
  console.log(`App is listening at port ${port}`);
});

//setting up ejs-mate for better templating
app.engine("ejs",ejsMate);


//setting up method-override 
app.use(methodOverride("_method"));

//setting up views and ejs
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"))
app.use(express.urlencoded({extended:true}));

//setting up the public folder for styling css
app.use(express.static(path.join(__dirname,"/public")));

//setting up mongoose
require("dotenv").config();

const mongoose=require("mongoose");


//making db mongodb atlas
const MONGO_URL = process.env.MONGO_URI;


main()
  .then(()=>{
    console.log("✅ Connected to MongoDB Atlas");
  })
  .catch((err)=>{
    console.error("❌ Connection error:", err);
  });

async function main(){
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

//setting up ROOT path no need waise toh hehe
app.get("/",(req,res)=>{
  res.render("home.ejs");
});

//setting up Home route 
app.get("/home",(req,res)=>{
  res.render("home.ejs")
})

//setting up RESULTS route
app.get("/home/results",(req,res)=>{
  res.render("form.ejs");
});

//setting up Admissions route
app.get("/home/admissions",(req,res)=>{
  res.render("admissions.ejs");
})

//setting up Show route
app.get("/home/show",async (req,res)=>{
  let {Univ}=req.query;
  console.log(Univ);
  let application=await Apply.find({University:Univ});
  console.log(application);
  res.render("show.ejs",{application});
});

//setting up Forum route
app.post("/home/forum", async(req,res)=>{
  const {username,email,University,Program,Degree,Season,Status,Date,GPA,General_GRE,Verbal_GRE,Aw_GRE}=req.body;
  try{
    let user=await User.findOne({email});
    if(!user){
      user=new User({username,email});
      await user.save();
    }
    const newApp=new Apply({
      University,
      Program,
      Season,
      Date,
      Degree,
      Status,
      GPA,
      General_GRE,
      Verbal_GRE,
      Aw_GRE,
      user:user._id
    });
    await newApp.save();
    res.render("thankyou.ejs");
  }catch (err) {
    console.error("Error submitting application:", err);
    res.status(500).send("Something went wrong");
  }
});

//forum page
app.get("/home/forum",(req,res)=>{
  res.render("find.ejs");
})

//setting up the fetch route
app.get("/home/fetch",async(req,res)=>{
  let{email}=req.query;
  const user=await User.findOne({email});
  const application=await Apply.find({user:user._id}).populate('user');
  res.render("show.ejs",{application})
})
//setting up all applications route
app.get("/home/all",async (req,res)=>{
  let alldata= await Apply.find();
  res.render("applications.ejs",{alldata});
})