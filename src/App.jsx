import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./pages/Dashboard";
import Documents from "./pages/Documents";
import Images from "./pages/Images";
import Media from "./pages/Media";
import Others from "./pages/Others";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

// Mock authentication state
const isLoggedIn = true; // change this dynamically based on actual auth

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes */}
        <Route
          path="/*"
          element={
            isLoggedIn ? (
              <div className="flex h-screen">
                <Sidebar />
                <div className="flex-1 overflow-y-auto">
                  <Routes>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="documents" element={<Documents />} />
                    <Route path="images" element={<Images />} />
                    <Route path="media" element={<Media />} />
                    <Route path="others" element={<Others />} />
                    {/* Redirect unknown routes to dashboard */}
                    <Route
                      path="*"
                      element={<Navigate to="dashboard" replace />}
                    />
                  </Routes>
                </div>
              </div>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}
