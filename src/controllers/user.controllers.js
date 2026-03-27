import { asyncWrap } from "../utils/errorHandler.js";

export const registerUser =  async (req,res)=>{
      console.log("Register route hit");

    return res.status(200).json({
        message:"ok"
    })
}