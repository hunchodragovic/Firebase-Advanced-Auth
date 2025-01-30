import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile";
import Dashboard from "./components/Dashboard";
import LogOut from "./components/LogOut";
import RequireAuth from "./context/RequireAuth"; // Import RequireAuth component

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<LogOut />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            {/* Protected Routes */}
            <Route element={<RequireAuth />}>
              <Route path="/update-profile" element={<UpdateProfile />} />
              <Route path="/" element={<Dashboard />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </Container>
  );
}

export default App;
