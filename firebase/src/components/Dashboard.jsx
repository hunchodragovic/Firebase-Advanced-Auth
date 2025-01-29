import React, { useState, useEffect } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext"; // Importing the useAuth hook
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { currentUser, logout } = useAuth(); // Accessing currentUser and logout function
  const [error, setError] = useState(""); // State to handle errors
  const [loading, setLoading] = useState(false); // State to manage loading status
  const navigate = useNavigate(); // Use for navigation

  useEffect(() => {
    if (!currentUser) {
      navigate("/login"); // Redirect to login if the user is not logged in
    }
  }, [currentUser, navigate]);

  const handleLogout = async () => {
    try {
      setError(""); // Reset any errors
      setLoading(true); // Start loading
      await logout(); // Call the logout function from context
      navigate("/login"); // Navigate to login after logging out
    } catch (error) {
      setError(error.message || "Failed to log out");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Dashboard</h2>
          {error && <Alert variant="danger">{error}</Alert>}{" "}
          {/* Show error message if any */}
          {currentUser && (
            <div>
              <p className="text-center">Welcome, {currentUser.email}!</p>
              <Button
                className="w-100 mt-3"
                variant="danger"
                onClick={handleLogout}
                disabled={loading}
              >
                {loading ? "Logging Out..." : "Log Out"}
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default Dashboard;
