import User from '../model/user.js';
import bcryptjs from "bcryptjs";
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';


/**
 * POST /auth/signup
 * Creates a new user account.
 * 
 * Request Body:
 * {
 *  "username": String (required),
 *  "email": String (required),
 *  "password": String (required),
 *  "profilePicture": String (optional)
 * }
 * 
 * Response:
 * 201 Created: User account created successfully.
 * 400 Bad Request: Invalid request data.
 */

export const signup = async(req,res,next)=>{
   const {username,email,password} = req.body;
   const hashedPassword = bcryptjs.hashSync(password,10);
   const newUser = new User({username,email,password:hashedPassword});
   try{
    await newUser.save();
    res.status(201).json({message:"User created successfully"});
   }catch(err){
    next(errorHandler(300,"some went wrong"));
   }
  
};


/**
 * POST /auth/signin
 * Authenticates a user and returns a JWT token.
 * 
 * Request Body:
 * {
 *  "email": String (required),
 *  "password": String (required)
 * }
 * 
 * Response:
 * 200 OK: JWT token returned successfully.
 * 401 Unauthorized: Invalid credentials.
 */
export const signin = async(req, res, next)=>{
   const{email, password} = req.body;
   try{
      const validUser = await User.findOne({email});
      if (!validUser) return next(errorHandler(401,'User not found'));
      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if(!validPassword) return (errorHandler(401), 'wrong credentials');
      const token = jwt.sign({id:validUser._id}, process.env.JWT_SECRET);
      res.cookie('access_token', token,{httpOnly:true}).status(200).json(validUser);
      const { password: hashedPassword, ...rest } = validUser._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res
        .cookie('access_token', token, { httpOnly: true, expires: expiryDate })
        .status(200)
        .json(rest);
   }catch(error){
      next(error);
   }
};

/**
 * POST /auth/google
 * Authenticates a user using Google OAuth.
 * 
 * Request Body:
 * {
 *  "tokenId": String (required)
 * }
 * 
 * Response:
 * 200 OK: JWT token returned successfully.
 * 401 Unauthorized: Invalid credentials.
 */
export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: hashedPassword, ...rest } = user._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res
        .cookie('access_token', token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-8),
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: hashedPassword2, ...rest } = newUser._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res
        .cookie('access_token', token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};



/**
 * GET /auth/signout
 * Signs out the current user.
 * 
 * Response:
 * 200 OK: User signed out successfully.
 */
export const signout = (req, res) => {
   res.clearCookie('access_token').status(200).json('Signout success!');
 };