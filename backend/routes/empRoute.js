import express from "express";
import multer from "multer";
import Employee from "../models/Emp.js";

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // folder where photos will be saved
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// POST create employee
router.post("/", upload.single("photo"), async (req, res) => {
  try {
    const { fullName, dob, email, phone, department, designation, gender } =
      req.body;

    const employee = new Employee({
      fullName,
      dob,
      email,
      phone,
      department,
      designation,
      gender,
      photo: req.file ? req.file.filename : null,
    });

    await employee.save();

    res.status(201).json(employee);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET employees with optional search
router.get("/", async (req, res) => {
  const { search } = req.query;
  const query = search
    ? {
        fullName: { $regex: search, $options: "i" },
      }
    : {};

  const employees = await Employee.find(query);
  res.json(employees);
});

export default router;
