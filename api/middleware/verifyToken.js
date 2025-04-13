import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log("verifyToken cookie token:\n", token);

  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, process.env.JWT_SECRET || "secretKey", (err, user) => {
    if (err){ 
        console.log("JWT error:", err); 
        return res.status(403).json("Token is not valid!");
    }

    console.log("verifyToken decoded user:\n", user);
    req.user = user;
    next();
  });
};
