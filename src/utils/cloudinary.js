import {v2 as cloudinary} from "cloudinary"
import fs from "fs" // This is file system

// Configure cloudinary -> name, key and secret
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload a local image on cloudinary 
const uploadOnCloudinary = async (localFilePath)=>{
    try {
        if(!localFilePath) return null // If file path does not exist return null
        // Upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {resource_type:"auto"})
        console.log("File is uploaded. Its url is",response.url)
        return response;
    }
    catch (error) {
        fs.unlinkSync(localFilePath);
        console.log("Error while uploading:",error);
        return null
    }    
}
    
    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url('shoes', {
        fetch_format: 'auto',
        quality: 'auto'
    });
    
    console.log(optimizeUrl);