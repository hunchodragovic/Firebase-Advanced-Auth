import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext"; // Import the useAuth hook
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { Card, Alert, Spinner } from "react-bootstrap"; // Import Bootstrap components

const EmailVerificationPage = () => {
  const { currentUser, reloadUser } = useAuth(); // Access the current user and reload function
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state
  const [success, setSuccess] = useState(""); // Success state
  const navigate = useNavigate(); // Initialize useNavigate

  // Check if the user's email is verified
  useEffect(() => {
    const checkEmailVerification = async () => {
      try {
        setLoading(true);
        setError("");

        // Reload the user to get the latest email verification status
        await reloadUser();
 
        if (currentUser?.emailVerified) {
          setSuccess("Your email has been successfully verified!");
        } else {
          setError("Email verification failed. Please try again.");
        }
      } catch (error) {
        setError("An error occurred while verifying your email.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    checkEmailVerification();
  }, [currentUser, reloadUser]);

  // Redirect to the dashboard after a delay
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate("/"); // Redirect to the dashboard after 5 seconds
      }, 5000);

      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [success, navigate]);

  return (
    <Card>
      <Card.Body>
        <h2 className="text-center mb-4">Email Verification</h2>
        {loading && (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
        {error && <Alert variant="danger">{error}</Alert>}
        {success && (
          <>
            <Alert variant="success">{success}</Alert>
            <p className="text-center">
              You will be redirected to the dashboard in 5 seconds...
            </p>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default EmailVerificationPage;
