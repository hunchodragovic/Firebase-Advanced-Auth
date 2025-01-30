import { createContext, useContext, useEffect, useState } from "react";
import auth from "../config/firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  sendEmailVerification,
} from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign up a new user
  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password).catch(
      (error) => {
        console.error("Error during sign up:", error.message);
        throw error;
      }
    );
  }

  // Log in an existing user
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Log out the user
  function logout() {
    return signOut(auth);
  }

  // Send password reset email
  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  // Update the user's email
  async function updateUserEmail(newEmail) {
    if (currentUser) {
      try {
        // First, send verification to the new email
        await sendEmailVerification(currentUser);
        // After the user verifies the new email, update the email
        await updateEmail(currentUser, newEmail);
      } catch (error) {
        console.error("Error updating email:", error.message);
        throw error;
      }
    } else {
      throw new Error("No user is currently logged in.");
    }
  }

  // Update the user's password
  function updateUserPassword(newPassword) {
    if (currentUser) {
      return updatePassword(currentUser, newPassword);
    } else {
      throw new Error("No user is currently logged in.");
    }
  }

  // Set the current user when auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateUserEmail,
        updateUserPassword,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}
