import React, { useState } from "react";
import { Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext"; // Importing useAuth hook

const LogOut = () => {
  const { logout } = useAuth(); // Get the logout function from the context
  const [error, setError] = useState(""); // State to hold error messages
  const [loading, setLoading] = useState(false); // State to manage loading status

  const handleLogout = async () => {
    try {
      setError(""); // Clear previous errors
      setLoading(true); // Set loading to true
      await logout(); // Call the logout function from context
    } catch (error) {
      setError(error.message || "Failed to log out"); // Set error message if logout fails
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log Out</h2>
          {error && <Alert variant="danger">{error}</Alert>}{" "}
          {/* Show error message */}
          <Button
            onClick={handleLogout}
            className="w-100 mt-3"
            variant="danger"
            disabled={loading} // Disable button while loading
          >
            {loading ? "Logging Out..." : "Log Out"}
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default LogOut;
