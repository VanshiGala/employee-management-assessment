import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import EmpTable from "./EmpTable";
import EmpModal from "./EmpModal";
import API from "../api/axios";

function Dashboard() {
  const [open, setOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
 

  const fetchEmployees = async () => {
    try {
      const { data } = await API.get(`/employees?search=${search}`);
      //console.log("Fetched employees:", data);
      setEmployees(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [search]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };
  return (
        <div className="bg-[#1e1e1e] min-h-screen">
          <Sidebar />
          <Topbar />

          <div className="ml-50 p-6">
            <div className="flex justify-between items-center mb-6">
              <input
                placeholder="Search..."
                className="px-4 py-2 rounded-full w-full bg-gray-200 focus:outline-none"
                onChange={(e) => setSearch(e.target.value)}
              />

              <button
                onClick={() => setOpen(true)}
                className="bg-blue-600 text-white cursor-pointer px-4 py-2 rounded hover:bg-blue-700"
              >
                +Create
              </button>
            </div>

            {open && <EmpModal setOpen={setOpen} fetchEmployees={fetchEmployees} />}

            <EmpTable employees={employees} />
          </div>
        </div>
      );

    }
    

export default Dashboard;
