import { useState } from "react";
import API from "../api/axios";

function EmpModal({ setOpen, fetchEmployees }) {
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    gender: "",
    photo: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "photo") {
      setFormData({ ...formData, photo: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      await API.post("/employees", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      fetchEmployees(); // refresh table
      setOpen(false); // close modal
    } catch (error) {
      console.log(error);
      alert("Error creating employee");
    }
  };

  return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white w-[900px] rounded-lg shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-800">
                Create Employee
              </h3>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-black text-xl"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm mb-1 font-medium text-blue-500">
                    Full Name
                  </label>
                  <input
                    name="fullName"
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* DOB */}
                <div>
                  <label className="block text-sm mb-1 font-medium text-blue-500">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dob"
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm mb-1 font-medium text-blue-500">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm mb-1 font-medium text-blue-500">
                    Phone
                  </label>
                  <input
                    name="phone"
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Department */}
                <div>
                  <label className="block text-sm mb-1 font-medium text-blue-500">
                    Department
                  </label>
                  <select
                    name="department"
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Department</option>
                    <option>HR</option>
                    <option>IT</option>
                    <option>Finance</option>
                  </select>
                </div>

                {/* Designation */}
                <div>
                  <label className="block text-sm mb-1 font-medium text-blue-500">
                    Designation
                  </label>
                  <select
                    name="designation"
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Designation</option>
                    <option>Manager</option>
                    <option>Developer</option>
                    <option>Intern</option>
                  </select>
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm mb-1 font-medium text-blue-500">
                    Gender
                  </label>
                  <select
                    name="gender"
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>

                {/* Photo */}
                <div>
                  <label className="block text-sm mb-1 font-medium text-blue-500">
                    Employee Photo
                  </label>
                  <input
                    type="file"
                    name="photo"
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 bg-white"
                  />
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="flex justify-end mt-8 space-x-4 border-t pt-4">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-5 py-2 border rounded text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }

export default EmpModal;
