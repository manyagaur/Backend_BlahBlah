export const createPost = async (req, res) => {
  try {
    console.log("----- Incoming Request -----");

    // Check if body is received
    if (!req.body) {
      console.error("No body found in request.");
      return res.status(400).json({ message: "No body in request" });
    }

    const { caption, user_id } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    console.log("req:", req.user);
    

    if (!caption && !req.file) {
      return res.status(400).json({ message: 'Post must have a caption or an image.' });
    }

    return res.status(200).json({
      message: 'Post received for debugging',
      caption,
      img_url: imageUrl,
      user_id,
      created_at: new Date()
    });

  } catch (err) {
    console.error("Error in createPost:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};
