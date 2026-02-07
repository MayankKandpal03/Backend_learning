# Level 04: File Upload Setup - Multer and Cloudinary

## Files (what changed / what to review)

* **`src/middlewares/multer.middleware.js`** — Configures Multer to handle `multipart/form-data`. It acts as a middleware to temporarily save uploaded files to the local server storage before cloud processing.
* **`src/utils/cloudinary.js`** — Handles the interaction with the Cloudinary API. It manages the upload of local files to the cloud and ensures local cleanup upon success or failure.

---

# Multer Middleware (Local Storage)

We use `multer` to handle file uploads because Express does not parse `multipart/form-data` out of the box.

### 1. Disk Storage Configuration

We utilize `diskStorage` rather than memory storage. This allows us to keep the file on our server temporarily, which is safer for handling large files before uploading them to a third-party service.

* **Destination**: Files are saved to `./public/temp`.
* **Naming Convention**: We currently retain the `file.originalname`. Note: In production, appending a timestamp or unique ID is recommended to prevent filename collisions.

```javascript
import multer from "multer"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/temp')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

export const upload = multer({ storage: storage })

```

---

# Cloudinary Utility (Cloud Storage)

The Cloudinary utility manages the lifecycle of the media file after it has landed on our local server.

### 1. Configuration

The Cloudinary library (`v2`) is configured using environment variables to keep API secrets secure.

```javascript
import {v2 as cloudinary} from "cloudinary"
import fs from "fs" // This is file system

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

```

### 2. Upload and Cleanup Strategy

The `uploadOnCloudinary` function implements a "clean-up on failure" strategy. This is crucial for maintaining server health.

1. **Validation**: Checks if a `localFilePath` is provided.
2. **Upload**: Attempts to upload to Cloudinary using `resource_type: "auto"` (detects image, video, raw, etc.).
3. **Success**: Returns the response object (containing the public URL).
4. **Error Handling (Crucial)**: If the upload fails, `fs.unlinkSync(localFilePath)` is executed. This removes the locally saved temporary file, preventing garbage accumulation on the server.

```javascript
const uploadOnCloudinary = async (localFilePath)=>{
    try {
        if(!localFilePath) return null // If file path does not exist return null
        // Upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {resource_type:"auto"})
        console.log("File is uploaded. Its url is",response.url)
        return response;
    }
    catch (error) {
        fs.unlinkSync(localFilePath); // Remove the locally saved temporary file as the upload operation got failed
        console.log("Error while uploading:",error);
        return null
    }    
}

```