import React, { useState } from 'react';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = e => {
    e.preventDefault();

    // Basic validation: passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // TODO: Submit data to backend here (e.g., axios post)

    alert(`Registering user: ${formData.username} with email: ${formData.email}`);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        style={inputStyle}
      />

      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        required
        style={inputStyle}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        style={inputStyle}
      />

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
        style={inputStyle}
      />

      {error && (
        <div style={{ color: '#ff4d4f', fontWeight: '600', textAlign: 'center' }}>
          {error}
        </div>
      )}

      <button type="submit" style={buttonStyle}>
        Register
      </button>
    </form>
  );
}

// Simple inline styles
const inputStyle = {
  padding: '10px',
  borderRadius: '6px',
  border: 'none',
  outline: 'none',
  fontSize: '1rem',
};

const buttonStyle = {
  padding: '12px',
  borderRadius: '6px',
  border: 'none',
  backgroundColor: '#4B0082',
  color: 'white',
  fontWeight: '700',
  cursor: 'pointer',
  fontSize: '1.1rem',
  transition: 'background-color 0.3s ease',
};

buttonStyle[':hover'] = {
  backgroundColor: '#6a11cb',
};
