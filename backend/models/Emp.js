import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [3, "Full name must be at least 3 characters"],
      maxlength: [50, "Full name cannot exceed 50 characters"],
      match: [/^[a-zA-Z\s]+$/, "Full name can contain only letters and spaces"]
    },

    dob: {
      type: Date,
      required: [true, "Date of birth is required"],
      validate: {
        validator: function (value) {
          const today = new Date();
          const age = today.getFullYear() - value.getFullYear();
          return age >= 18; // minimum age restriction
        },
        message: "Employee must be at least 18 years old"
      }
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address"
      ]
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      validate: {
        validator: function (value) {
          return /^[0-9]{10}$/.test(value); // 10 digit phone
        },
        message: "Phone number must be exactly 10 digits"
      }
    },

    department: {
      type: String,
      required: [true, "Department is required"],
      enum: {
        values: ["HR", "IT", "Finance", "Marketing", "Sales"],
        message: "{VALUE} is not a valid department"
      }
    },

    designation: {
      type: String,
      required: [true, "Designation is required"],
      trim: true,
      minlength: [2, "Designation must be at least 2 characters"]
    },

    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: {
        values: ["Male", "Female", "Other"],
        message: "{VALUE} is not a valid gender"
      }
    },

    photo: {
      type: String,
      validate: {
        validator: function (value) {
          if (!value) return true; // optional field
          return /\.(jpg|jpeg|png|webp)$/i.test(value);
        },
        message: "Photo must be a valid image file (jpg, jpeg, png, webp)"
      }
    },
  },
  { timestamps: true }
);

export default mongoose.model("Employee", employeeSchema);