import React, { useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Importing the useAuth hook
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const { resetPassword } = useAuth(); // Accessing resetPassword from AuthContext
  const [email, setEmail] = useState(""); // State to store the email input
  const [error, setError] = useState(""); // State to store any errors
  const [message, setMessage] = useState(""); // State to store success message
  const [loading, setLoading] = useState(false); // State to manage loading
  const navigate = useNavigate(); // Use for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError(""); // Reset any previous errors
      setMessage(""); // Reset any previous success messages
      setLoading(true); // Start loading

      await resetPassword(email); // Call the resetPassword function
      setMessage("Check your inbox for password reset instructions."); // Success message
    } catch (error) {
      setError(error.message || "Failed to reset password"); // Error handling
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Forgot Password</h2>
          {error && <Alert variant="danger">{error}</Alert>}{" "}
          {/* Show error message if any */}
          {message && <Alert variant="success">{message}</Alert>}{" "}
          {/* Show success message if any */}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update the email state
                required
              />
            </Form.Group>
            <Button
              type="submit"
              className="w-100 mt-3"
              variant="primary"
              disabled={loading}
            >
              {loading ? "Sending Reset Email..." : "Send Reset Email"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/login">Back to Login</Link>
      </div>
    </>
  );
};

export default ForgotPassword;
