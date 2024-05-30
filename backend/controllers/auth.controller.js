import User from '../model/user.js';
import bcryptjs from "bcryptjs";
import { errorHandle } from '../utils/error.js';

export const signup = async(req,res,next)=>{
   const {username,email,password} = req.body;
   const hashedPassword = bcryptjs.hashSync(password,10);
   const newUser = new User({username,email,password:hashedPassword});
   try{
    await newUser.save();
    res.status(201).json({message:"User created successfully"});
   }catch(err){
    next(errorHandle(300,"some went wrong"));
   }
  
};