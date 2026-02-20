import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  //console.log("Incoming email:", email);
  //console.log("Incoming password:", password);

  const user = await User.findOne({ email });
//console.log("LOGIN USER:", user.email, "ROLE:", user.role);
  //console.log("User from DB:", user);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials - no user" });
  }
   //console.log("User role:", user.role);
  const isMatch = await bcrypt.compare(password, user.password);

  //console.log("Password match result:", isMatch);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials - password wrong" });
  }

  if (user.role !== "admin") {
    console.log("Blocked non-admin login");
    return res.status(403).json({ message: "Access denied. Admin only." });
  }

  res.status(200).json({
    token: generateToken(user),
    user: {
      id: user._id,
      email: user.email,
    },
  });
};