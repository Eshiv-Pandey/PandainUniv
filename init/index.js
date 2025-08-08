require("dotenv").config({ path: "../.env" });

const mongoose = require("mongoose");
const initData = require("./data.js"); // adjust if path is different
const Apply = require("../models/listing.js"); // adjust if needed


const MONGO_URL = process.env.MONGO_URI; // instead of hardcoded local URL

// Connect to DB
main()
  .then(() => {
    console.log(" Connected to MongoDB Atlas");
    return initdb();
  })
  .then(() => {
    console.log("Data was initialized!");
    mongoose.connection.close(); 
  })
  .catch((err) => {
    console.log(" Error:", err);
  });

async function main() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

async function initdb() {
  await Apply.deleteMany({});
  await Apply.insertMany(initData.data);
}
