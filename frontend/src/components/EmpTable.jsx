import React from 'react'
import action from '../../public/Assets/action.svg'
function EmpTable({employees}) {
  return (
        <div className="w-full bg-gray-900 rounded-lg overflow-hidden shadow-lg">
          <table className="w-full text-white text-sm">
            <thead className="bg-blue-600">
              <tr>
                <th className="p-3">Employee Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Gender</th>
                <th>DOB</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Photo</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody className="text-center">
              {employees.length === 0 ? (
                <tr>
                  <td colSpan="9" className="p-3 text-gray-400">
                    No employees found.
                  </td>
                </tr>
              ) : (
                employees.map((emp) => (
                  <tr
                    key={emp._id}
                    className="border-t border-gray-700 hover:bg-gray-800"
                  >
                    <td className="p-3">{emp.fullName}</td>
                    <td>{emp.email}</td>
                    <td>{emp.phone}</td>
                    <td>{emp.gender}</td>
                    <td>{new Date(emp.dob).toLocaleDateString()}</td>
                    <td>{emp.department}</td>
                    <td>{emp.designation}</td>
                    <td>
                      {emp.photo ? (
                        <img
                          src={`${import.meta.env.VITE_API_URL}/uploads/${emp.photo}`}
                          className="w-10 h-10 mx-auto rounded-full"
                        />
                      ) : (
                        "📎"
                      )}
                    </td>
                    <td>
                      <img src={action} className="w-12" />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      );
    }


export default EmpTable