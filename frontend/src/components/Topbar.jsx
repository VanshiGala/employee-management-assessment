//  function Topbar() {
//   return (
//     <div className="ml-46 h-14 bg-white flex items-center justify-between px-6 border-b border-blue-500">
//       <h2 className="text-blue-400 text-lg">Employee Setup</h2>
//       <div className="text-white text-xl">👤</div>
//     </div>
//   );
// }
// export default Topbar

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Topbar() {
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Get token from localStorage
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (!token || !storedUser) {
      navigate("/"); // redirect if not logged in
    } else {
      try {
        // Decode token to get user info
        setUser(JSON.parse(storedUser).email);
      } catch (error) {
        console.error("Invalid token");
        navigate("/");
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove token
    localStorage.removeItem("user");
    navigate("/"); // redirect to login
  };

  return (
        <div className="ml-46 h-14 bg-white flex items-center justify-between px-6 border-b border-blue-500">
          <h2 className="text-blue-400 text-lg">Employee Setup</h2>
          <div className="flex items-center gap-4">
            <span className="text-blue-400">Hello {user}</span>
            <button
              onClick={handleLogout}
              className="bg-blue-400 text-white px-3 py-1 rounded hover:bg-blue-500"
            >
              Logout
            </button>
          </div>
        </div>
      );
    }

    

export default Topbar;