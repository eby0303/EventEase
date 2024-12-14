import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password,
        role,
      });
      setMessage(response.data.message);
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      console.error('Registration failed:', error.response ? error.response.data : error.message);
      setMessage(error.response.data ? error.response.data.message : 'Registration failed');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Register</h2>
      {message && <p style={styles.message}>{message}</p>}
      <form onSubmit={handleRegister} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Username: </label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Email: </label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Password: </label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Register as: </label>
          <select value={role} onChange={(e) => setRole(e.target.value)} style={styles.select}>
            <option value="customer">Customer</option>
            <option value="seller">Seller</option>
          </select>
        </div>
        <button type="submit" style={styles.button}>Register</button>
      </form>
      <p style={styles.loginText}>
        Already have an account? 
        <button onClick={() => navigate('/login')} style={styles.loginButton}>Login</button>
      </p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#1a1a1a',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(255, 102, 0, 0.1)',
  },
  title: {
    color: '#ff6600',
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    color: '#ffffff',
    marginBottom: '5px',
    display: 'block',
  },
  input: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #333333',
    backgroundColor: '#2a2a2a',
    color: '#ffffff',
  },
  select: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #333333',
    backgroundColor: '#2a2a2a',
    color: '#ffffff',
  },
  button: {
    backgroundColor: '#ff6600',
    color: '#ffffff',
    padding: '10px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  },
  message: {
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: '10px',
  },
  loginText: {
    color: '#cccccc',
    textAlign: 'center',
    marginTop: '20px',
  },
  loginButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ff6600',
    cursor: 'pointer',
    fontSize: '16px',
    marginLeft: '5px',
  },
};

export default Register;