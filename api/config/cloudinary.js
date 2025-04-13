import dotenv from 'dotenv';
dotenv.config(); // Load .env file
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';


cloudinary.config({
  // cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  // api_key: process.env.CLOUDINARY_API_KEY,
  // api_secret: process.env.CLOUDINARY_API_SECRET,
});
console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API Key:", process.env.CLOUDINARY_API_KEY);
console.log("API Secret:", process.env.CLOUDINARY_API_SECRET);
console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API Key:", process.env.CLOUDINARY_API_KEY);
console.log("A:", process.env.DB_NAME);



const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'uploads', // Specify folder in Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg'], // Allow image formats
  },
});

export { cloudinary, storage };
