import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

export const loginUser = async (req, res) => {
  console.log(req.body);
try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return res.status(400).json({ message: "Invalid email format" });

    if (password.length < 6) return res.status(400).json({ message: "Password must be at least 6 characters" });

    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      // User does not exist → create user
      const hashedPassword = await bcrypt.hash(password, 10);
      user = new User({ email, password: hashedPassword });
      await user.save();
    } else {
      // User exists → check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });
    }

    // Return JWT
    res.status(200).json({ token: generateToken(user), user:{email:user.email} });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};