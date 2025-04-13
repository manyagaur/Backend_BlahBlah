import { db } from "../connect.js";

export const createPost = async (req, res) => {
    const { caption, user_id } = req.body;
  
    try {
      // Image URL from Cloudinary
      const imageUrl = req.file ? req.file.path : null;
  
      // Perform DB insertion (Pseudo query, customize as per your DB logic)
      const query = 'INSERT INTO posts (`caption`, `img_url`, `user_id`, `created_at`) VALUES (?, ?, ?, NOW())';
      const values = [caption, imageUrl, user_id];
  
      db.query(query, values, (err, data) => {

        console.log("addPost query: ", query)
        if (!caption && !req.file) {
          return res.status(400).json({ message: 'Post must have a caption or an image.' });
        }
        
        if (err) return res.status(500).json({ message: 'Failed to add post', error: err });
  
        res.status(200).json(
          { message: 'Post added successfully!', 
            postId: data.insertId,
            caption: caption,        
            img_url: imageUrl,        
            user_id: user_id,          
            created_at: new Date()     
          }
        );
      });
    } catch (err) {
      res.status(500).json({ error: 'Failed to upload post', details: err });
    }
  };
  