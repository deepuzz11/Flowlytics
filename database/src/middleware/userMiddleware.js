import UserAuthModel from "../Model/userAuthModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import BlackListTokenModel from "../Model/BlacklistedToken.js";

const userAuthMiddleware = async (req, res, next) => {
    try {
      const token =req.cookies.token ||  req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(400).json({ message: "Unauthorized Access: Token missing" });
      } 
      const isBlackList = await BlackListTokenModel.findOne({token}
      )
      if(isBlackList)
      {
        return res.status(400).json({message : "UnAuthorized Access"})
      }
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const user = await UserAuthModel.findById(decoded._id);
      if (!user) {
        return res.status(400).json({ message: "Unauthorized Access: User not found" });
      }
      req.user = user;
      return next();
    } catch (error) {
      console.error("Error in authentication middleware:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
export default userAuthMiddleware