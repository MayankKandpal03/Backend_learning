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
    this.password = bcrypt.hash(this.password,10)
    next()
})

const User = mongoose.model('User',userSchema)

export default User