import express from 'express';
import multer from 'multer';
import { createPost } from '../controllers/postController.js';
import { storage } from '../config/cloudinary.js';

const router = express.Router();
const upload = multer({ storage });  // Use Cloudinary storage with multer

// Route to handle image upload & post creation
router.post('/add', upload.single('image'), createPost);

export default router;
