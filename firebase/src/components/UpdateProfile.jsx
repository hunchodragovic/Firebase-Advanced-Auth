import React, { useState } from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext"; // Importing the useAuth hook
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const UpdateProfile = () => {
  const { currentUser, updateUserEmail, updateUserPassword } = useAuth(); // Accessing update functions
  const [error, setError] = useState(""); // To store errors
  const [success, setSuccess] = useState(""); // To store success messages
  const [loading, setLoading] = useState(false); // To manage loading state
  const [email, setEmail] = useState(currentUser?.email || ""); // Current user email
  const [password, setPassword] = useState(""); // Password
  const [passwordConfirm, setPasswordConfirm] = useState(""); // Password confirmation

  const navigate = useNavigate(); // Initialize useNavigate

  const handleEmailChange = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await updateUserEmail(email); // Calling the updateUserEmail function
      setSuccess("Email updated successfully.");
    } catch (error) {
      setError(error.message || "Failed to update email.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      return setError("Passwords do not match.");
    }

    try {
      setError("");
      setLoading(true);
      await updateUserPassword(password); // Calling the updateUserPassword function
      setSuccess("Password updated successfully.");
    } catch (error) {
      setError(error.message || "Failed to update password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <Card.Body>
        <h2 className="text-center mb-4">Update Profile</h2>
        {error && <Alert variant="danger">{error}</Alert>} {/* Display error */}
        {success && <Alert variant="success">{success}</Alert>}{" "}
        {/* Display success */}
        {/* Email Update Form */}
        <Form onSubmit={handleEmailChange}>
          <Form.Group id="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Button
            type="submit"
            className="w-100 mt-3"
            variant="primary"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Email"}
          </Button>
        </Form>
        {/* Password Update Form */}
        <Form onSubmit={handlePasswordChange} className="mt-4">
          <Form.Group id="password">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group id="password-confirm" className="mt-2">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
            />
          </Form.Group>
          <Button
            type="submit"
            className="w-100 mt-3"
            variant="primary"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Password"}
          </Button>
        </Form>
        {/* Back to Dashboard Button */}
        <Button
          className="w-100 mt-4"
          variant="secondary"
          onClick={() => navigate("/")} // Navigates to the dashboard
        >
          Back to Dashboard
        </Button>
      </Card.Body>
    </Card>
  );
};

export default UpdateProfile;
