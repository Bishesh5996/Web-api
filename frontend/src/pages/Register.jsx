import React, { useState, useEffect } from 'react';
import RegisterForm from '../components/auth/RegisterForm';

export default function Register() {
  // Simulated user login status (replace with actual auth logic)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Example: check login status on component mount (replace with real logic)
  useEffect(() => {
    // Simulate fetching login state, e.g., from localStorage or API
    const loggedIn = false; // change to true to test logged-in state
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <div
      style={{
        maxWidth: '400px',
        margin: '40px auto',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
        background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
        color: 'white',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        textAlign: 'center',
      }}
    >
      <h1 style={{ marginBottom: '20px', fontWeight: '700' }}>Create Your Account</h1>

      {isLoggedIn ? (
        <p style={{ fontSize: '18px', fontWeight: '600' }}>
          You are already logged in.
        </p>
      ) : (
        <>
          <p style={{ marginBottom: '20px', fontSize: '16px' }}>
            Please fill in the details below to register.
          </p>
          <RegisterForm />
        </>
      )}
    </div>
  );
}
