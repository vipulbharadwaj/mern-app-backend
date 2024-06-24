const mongoose = require("mongoose");

//const URI =  "mongodb+srv://THEVIPULBHARDWAJ:bCGX4mQeyesmuJQg@cluster0.34cbosm.mongodb.net/mern_admin?retryWrites=true&w=majority&appName=Cluster0";
const URI = process.env.MONGODB_URI;

const connectDb = async () =>{
    try{
        await mongoose.connect(URI);
        console.log("Connection Successful to DB");
    }catch{
        console.error("connection failed");
        process.exit(0);
    }
};

module.exports = connectDb;