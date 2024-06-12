import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [registrationMessage, setRegistrationMessage] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setRegistrationMessage('');

    if (!email) {
      setEmailError('Email is required.');
      return;
    } else if (!validateEmail(email)) {
      setEmailError('Invalid email format.');
      return;
    }

    if (!password) {
      setPasswordError('Password is required.');
      return;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
      return;
    }

    try {
      await axios.post('https://gmail-clone-backend-parts-4.onrender.com/api/register', { email, password });
      setRegistrationMessage('Registration successful!');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      console.error('Error registering user:', error.response?.data || error.message);
      setRegistrationMessage(error.response?.data.message || 'Registration failed.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={`input-field ${emailError ? 'error' : ''}`}
          />
          {emailError && <p className="error-message">{emailError}</p>}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={`input-field ${passwordError ? 'error' : ''}`}
          />
          {passwordError && <p className="error-message">{passwordError}</p>}
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className={`input-field ${confirmPasswordError ? 'error' : ''}`}
          />
          {confirmPasswordError && <p className="error-message">{confirmPasswordError}</p>}
        </div>
        {registrationMessage && <p className="success-message">{registrationMessage}</p>}
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
}

export default Register;












