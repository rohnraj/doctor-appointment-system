import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { getUserByEmail, createUser, getAllUserModel , userExistWithGoogleID} from "../models/userModel.js";
import passport from '../config/passport.js';

const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// User Signup
export const signup = async (req, res) => {
  console.log(req.body)
  try {
    const {role, name, email, password, phone} = req.body;
    if (!name || !email || !password) return res.status(400).json({ success: false, message: "All fields are required" });

    if (role === "admin") return res.status(403).json({ success: false, message: "Admin role cannot be created via API" });

    const existingUser = await getUserByEmail(email);
    if (existingUser) return res.status(400).json({ success: false, message: "Email already exists" });

    const newUser = await createUser(role, name, phone, email, password);
    // const token = generateToken(newUser);

    // res.status(201).json({ success: true, message: "User registered", user: newUser, token });
    res.status(201).json({ success: true, message: "User registered", user: newUser});
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// User Login
export const login = async (req, res) => {

  // console.log('login route running', req.body)
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: "Email and password are required" });

    const user = await getUserByEmail(email);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ success: false, message: "Invalid credentials" });

    const token = generateToken(user);
    
    console.log('generated token'+token)
    res.cookie("token", token, {
      httpOnly: true, 
      secure: true, 
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // req.cookie("token", token, {
    //   httpOnly: true, 
    //   secure: false, 
    //   sameSite: "None",
    //   maxAge: 7 * 24 * 60 * 60 * 1000,
    // });


    console.log("Set-Cookie Header:", res.getHeaders()["set-cookie"]);
    // res.status(200).json({ success: true, message: "Login successful", user, token });
    res.status(200).json({ success: true, message: "Login successful", user, token});
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//logout
export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logout successful" });
};

//isAuthenticated
export const chekAuth = (req, res) => {
  console.log(req.user)
  res.json({ success: true, message: "User is authenticated", user: req.user });
};

//getALLUser
export const getAllUser = async (req, res) =>{
  try{
    const data = await getAllUserModel()
    res.status(200).json({ success: true, message: "All users", data });
  }
  catch(err){
    console.log('err while getAllUser' + err)
  }
}

export const googleController = (req, res) =>{
  passport.authenticate("google", {
    // In OAuth 2.0, scope defines what kind of access your app is requesting from the user’s Google account.
    scope: ["email", "profile"],
  })(req, res);
  // res.json({message:'hello'})
}

import generator  from 'generate-password';

export const googleCallbackController = (async (req, res) => {
  passport.authenticate("google", { session: false }, async (err, profile) => {
    if (err) {
      return res.status(500).json({success:false, message:"Google authentication failed"})
    }
    if (!profile) {
      return res.status(401).json({success:false, message:"Google authentication failed"})
    }

    //find user with google_id 
    const {sub, name, email} = profile._json
    // console.log(sub, name, email)
    const userExist = await userExistWithGoogleID(sub)

    if(userExist.length===0){
      const password = generator.generate({
        length: 10,
        numbers: true
      });
      console.log(`random password: ${password}`)

      try{
        const response = await createUser('patient',name, '1234567890', email, password, sub)
        console.log(response)
        const user = await userExistWithGoogleID(sub)
        const token = generateToken(user);
    
        console.log('generated token'+token)
        res.cookie("token", token, {
          httpOnly: true, 
          secure: true, 
          sameSite: "None",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        // res.status(200).json({ success: true, message: "Login successful", user, token});
        res.status(200).redirect(`http://localhost:3000/Appointments`)
        
      }catch(err){
        res.status(400).json({success:false, message: 'somthing went wrong in executing createUser()'})
      }
    }
    else{
      
      const user = await userExistWithGoogleID(sub)
      const token = generateToken(user);
    
      console.log('generated token'+token)
      res.cookie("token", token, {
        httpOnly: true, 
        secure: true, 
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      // res.status(200).json({ success: true, message: "Login successful", user, token});

      res.status(200).redirect(`http://localhost:3000/Appointments`)
    }
  })(req, res);
});