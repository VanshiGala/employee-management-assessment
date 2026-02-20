import Employee from "../models/Emp.js";

export const createEmployee = async (req, res) => {
  try {
    const {
      fullName,
      dob,
      email,
      phone,
      department,
      designation,
      gender,
    } = req.body;

    const employee = await Employee.create({
      fullName,
      dob,
      email,
      phone,
      department,
      designation,
      gender,
      photo: req.file ? req.file.path : "",
    });

    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getEmployees = async (req, res) => {
  const { search, department, designation, gender } = req.query;

  let query = {};

  if (search) {
    query.$or = [
      { fullName: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { department: { $regex: search, $options: "i" } },
    ];
  }

  if (department) query.department = department;
  if (designation) query.designation = designation;
  if (gender) query.gender = gender;

  try {
    const employees = await Employee.find(query).sort({ createdAt: -1 });
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }

  res.json(employees);
};
