import { db } from "../connect";

export const createPost = async (req, res) => {
    const { caption, user_id } = req.body;
  
    try {
      // Image URL from Cloudinary
      const imageUrl = req.file.path;
  
      // Perform DB insertion (Pseudo query, customize as per your DB logic)
      const query = 'INSERT INTO posts (`caption`, `img_url`, `user_id`, `created_at`) VALUES (?, ?, ?, NOW())';
      const values = [caption, imageUrl, user_id];
  
      db.query(query, values, (err, data) => {
        if (err) return res.status(500).json({ message: 'Failed to add post', error: err });
  
        res.status(200).json({ message: 'Post added successfully!', postId: data.insertId });
      });
    } catch (err) {
      res.status(500).json({ error: 'Failed to upload post', details: err });
    }
  };
  