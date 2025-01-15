import UserAuthModel from "../Model/userAuthModel.js";
import BlackListTokenModel from "../Model/BlacklistedToken.js";
import { validationResult } from "express-validator";
const userAuthController = {
  SignUp: async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const hashed = await UserAuthModel.hashPassword(password); 
      const isUserAlreadyExist = await UserAuthModel.findOne({Email : email})
      if(isUserAlreadyExist)
      {
        return res.status(401).json({Warning : "User Already exist "})
      }
      const createUser = await UserAuthModel.create({
        FullName: { firstName, lastName },
        email,
        password: hashed,
      });
    
      if (!createUser) {
        return res.status(404).json({ message: "Cannot create a user" });
      }
      const token = createUser.generateAuthToken();
      res
        .status(200)
        .json({
          success: "User created successfully",
          Data: token,
          createUser,
        });
    } catch (error) {
      console.error("Error creating user:", error); 
      res.status(500).json({ failure: "Internal server error" });
    }
  },
  SignIn : async (req,res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const {Email,password} = req.body;
        const user = await UserAuthModel.findOne({Email}).select('+password')
        const isMatch = user.comparePassword(password);
        if(!user)
        {
            return res.status(400).json({data: "not found"})
        }
        if(!isMatch)
            return res.status(401).json({message : "Invalid credentials"})
        const token = user.generateAuthToken();
        res.cookie('token',token)
        //console.log(res.cookie)
        res.status(200).json({success : "login successfully", data : token,user})
    } catch (error) {
        console.error("Error creating user:", error); 
        res.status(500).json({ failure: "Internal server error" });
    }
  },
//   logging out 
LogOut: async (req, res, next) => {
    try {
      res.clearCookie('token'); // Clear the token cookie
      const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(400).json({ message: "Token missing" });
      }
   
      await BlackListTokenModel.create({ token }); // Blacklist the token
      return res.status(200).json({ Success: "Logout successfully" }); // Send a success response
    } catch (error) {
      console.error("Error logging out:", error);
      return res.status(500).json({ Error: "Internal server error" }); // Handle errors
    }
  }
  
  
};
export default userAuthController;
