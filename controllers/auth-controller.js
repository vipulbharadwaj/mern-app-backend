const User = require("../models/user-model");
const bcrypt = require("bcryptjs");


const home = async(req, res) => {
    try{
        res.status(200).send("Welcome to home page");

      }  catch(error) {
        console.log(error);
    }
};

//Registering the User

const register = async(req, res)=>{
  try{
    const { username, email, phone, password } = req.body;

    const UserExist = await User.findOne({email});

    if(UserExist){
      return res.status(400).json({message:"Email already exists"});
    }
    const saltRound = 10;
    const hash_password = await bcrypt.hash(password, saltRound);

    const newUser = await User.create({username, email, phone, password: hash_password});

    console.log(req.body);
     res.status(201).json({ message: "User registered successfully", user: { username, email, phone, password }, token: await newUser.generateToken(),
    userId: newUser._id.toString(),
  });
    //res.status(200).send({msg: newUser});
  }
  catch(error){
    next(error);
  }
};

//Logging in 

const login = async(req, res) =>{
  try{
    const {email, password} = req.body;
    const userExist = await User.findOne({email});
    console.log(userExist);

    if(!userExist){
      return res.status(400).json({message: "Inavlid Credentials"});
    }

    const userpass = await bcrypt.compare(password, userExist.password);
    
    if(userpass){
      const token = await userExist.generateToken();
      res.status(200).json({
        msg: "Login Successful", user: { email, password},
        token
      });
    }
    else{
      res.status(401).json({message: "Invalid username or password"});
    }
  }catch(error) {
    res.status(401).json("Internal Server Error");
  }
}


// *******************
//* to send user data
//********************

const user = async(req, res)=>{
  try {
    const userData = req.user;
    console.log(userData);
    res.status(200).json({userData});
    
  } catch (error) {
    console.log(`error from the user route ${error}`);
    
  }
};

module.exports = {home, register, login, user};

