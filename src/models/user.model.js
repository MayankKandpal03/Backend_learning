// Import mongoose, bcryptjs for encryption and jwt for token
import mongoose from "mongoose"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema(
    {
        username: {
             type:String,
             required:true,
             unique:true,
             lowercase:true,
             trim:true,
             index:true
        },
        email: {
             type:String,
             required:true,
             unique:true,
             lowercase:true,
             trim:true,
             index:true,
             regex:/^[^\s@]+@[^\s@]+\.[^\s@]+$/
         },
         fullname:{
            type: String,
            required: true,
            trim:true,
            index:true
         },
         avatar:{
            type:String,
            required:true
         },
         coverImage:{
            type:String
         },
         watchHistory:[
            {
                type:Schema.Types.ObjectId,
                ref:"Video"
            }
         ],
         passwordHash:{
            type:String,
            required:[true,'Password is Required']
         }
    },
    {timestamps: true}
)

/**
 * Creating a pre hook -> Pre hook executes a function before saving, updating, deleting or validating
 * Need to use next otherwise the control will end here and other necessary functions will not be executed
 */
userSchema.pre("save", async function(next){

    // Condition to check if password is stored or updated, if not then skip the block
    if(!this.isModified("password")) return next()
    
    /**
     *  We will store the hashed password inside database for security reasons. For that we will use bcrypt and its syntax is 
     * password = bcrypt.hash(password , salt) This will store hashed password inside password
     */
    this.passwordHash = bcrypt.hash(this.passwordHash,10)
    next()
})

/**
 * Create an async method to compare password.
 * bcrypt.compare(password,hashPassword)
 */
userSchema.methods.isPasswordCorrect = async function(password){
   return bcrypt.compare(password,this.passwordHash)
}

userSchema.methods.generateAccessToken= function(){
   return jwt.sign(
      {
         _id: this._id,
         email: this.email,
         userName: this.username
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
         expiresIn: process.env.ACCESS_TOKEN_EXPIRY
      }
   )
}
userSchema.methods.generateRefreshToken= function(){
      return jwt.sign(
      {
         _id: this._id,
         email: this.email,
         userName: this.username
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
         expiresIn: process.env.REFRESH_TOKEN_EXPIRY
      }
   )
}

const User = mongoose.model('User',userSchema)

export default User