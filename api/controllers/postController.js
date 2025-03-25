import { db } from "../connect";

export const addPost = (req,res) => {
    const { caption, img_url, user_id } = req.body;

    // SQL Query to insert post into the posts table
    const query = "INSERT INTO posts (`caption`, `img_url`, `user_id`, `created_at`) VALUES (?, ?, ?, NOW())";
    
    const values = [caption, img_url, user_id];  
    db.query(query, values, (err, data) => {
        if (err) return res.status(500).json({ message: "Failed to add post", error: err });

        return res.status(200).json({ message: "Post added successfully!", postId: data.insertId });
    });
}