import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    FullName: {
        firstName: {
          type: String,
          require: true,
          minlength: [3, "first name must be of three alphabets"],
          maxlength : [25, "first name cannot exceed from 25 alphabets"]
        },
        lastName: {
          type: String,
          minlength: [3, "first name must be of three alphabets"],
        },
      },
      email : {
        type: String,
        require: true,
        unique: true,
      },
      password: {
        type: String,
        require: true,
        minlength: [5, "string must be of 5 elements "],
        select: false,
      },
})

//methods
userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({id: this._id}, process.env.SECRET_KEY, {expiresIn : '24h'})
    return token;
}
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
  userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
  };

  const UserAuthModel = mongoose.model("User Authentication", userSchema);
  export default UserAuthModel;