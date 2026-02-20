import Login from "./components/Login"
import {Routes, Route} from "react-router"
import Dashboard from "./components/Dashboard"
import ProtectedRoute from '../utils/protectedRoute'

function App() {
  

  return (
    <>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App
