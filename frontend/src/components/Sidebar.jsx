import React from 'react'

function Sidebar() {
  const menu = [
    { name: "Employee", icon: "/Assets/employee.svg" },
    { name: "Leaves", icon: "/Assets/leaves.svg" },
    { name: "Holidays", icon: "/Assets/holidays.svg" },
    { name: "Outdoor Duty", icon: "/Assets/outdoor_duty.svg" },
    { name: "Expense", icon: "/Assets/expense.svg" },
    { name: "Attendance", icon: "/Assets/attendance.svg" },
    { name: "IT Computation", icon: "/Assets/it_computation.svg" },
    { name: "Salary", icon: "/Assets/salary.svg" },
    { name: "Documents", icon: "/Assets/documents.svg" },
    { name: "Training & Dev", icon: "/Assets/training.svg" },
    { name: "Performance", icon: "/Assets/performance.svg" },
    { name: "HR Policies", icon: "/Assets/hr.svg" },
    { name: "Reports", icon: "/Assets/reports.svg" },
    { name: "Support", icon: "/Assets/support.svg" },
  ];
  return (
    <div>
      <div className="w-50 h-screen bg-black text-white fixed left-0 top-0 border-r-2 border-blue-500">
        <div className="text-pink-500 text-2xl font-bold p-2">IDMS</div>

        <ul className="space-y-0.5">
          {menu.map((item, index) => (
            <li
              key={index}
              className="flex items-center gap-3 px-5 py-2 hover:bg-blue-700 cursor-pointer border-b border-gray-700"
            >
              {/* Icon */}
              <img
                src={item.icon}
                alt={item.name}
                className="w-5 h-5"
              />

              {/* Menu Name */}
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar
