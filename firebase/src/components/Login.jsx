import React, { useState } from "react";
import { Button, Card, Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Make sure to import useAuth hook
import { useNavigate } from "react-router-dom";
const Login = () => {
  const { login } = useAuth(); // Get the login function from the context
  const [error, setError] = useState(""); // State to hold error messages
  const [loading, setLoading] = useState(false); // State to manage loading status
  const [formData, setFormData] = useState({
    // Form data state
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError(""); // Clear previous errors
      setLoading(true); // Set loading to true
      await login(formData.email, formData.password); // Attempt to login
      navigate("/");
    } catch (error) {
      setError(error.message || "Failed to log in"); // Set error message if login fails
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}{" "}
          {/* Show error message */}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button
              type="submit"
              className="w-100 mt-3"
              variant="primary"
              disabled={loading} // Disable button while loading
            >
              {loading ? "Logging In..." : "Login"}
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
};

export default Login;
