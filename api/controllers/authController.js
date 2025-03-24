import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Register
export const register = (req, res) => {
  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json({ message: err });

    if (data.length) return res.status(409).json("User already exists!");

    // If user does not exist, create one
    const query = "INSERT INTO users (`username`, `email`, `password`, `firstname`, `lastname`) VALUES (?, ?, ?, ?, ?)";

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const values = [
      req.body.username,
      req.body.email,
      hash,
      req.body.firstname,
      req.body.lastname,
    ];

    db.query(query, values, (err) => {
      if (err) return res.status(500).json({ message: "User not created", error: err });

      return res.status(200).json("Congrats! Your account has been successfully created.");
    });
  });
};

// Login
export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE email = ?";

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json({ message: "Database connection error" });

    if (data.length === 0) return res.status(404).json("User not found");

    const user = data[0];
    const checkPassword = bcrypt.compareSync(req.body.password, user.password);

    if (!checkPassword) {
      return res.status(400).json({
        message: "Incorrect password",
        user,
      });
    }

    const token = jwt.sign({ id: user.id }, "secretKey", { expiresIn: "1h" });

    const { password, ...others } = user;

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    }).status(200).json({ access_token: token, others });
  });
};

// Logout
export const logout = (req, res) => {
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  }).status(200).json("User has been logged out.");
};
