import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password,
      });
  
      // Check the response structure
      console.log(response.data);
  
      // Assuming your response contains userId, token, and role
      login(response.data.role, response.data.token);
  
      // Store userId and token in sessionStorage
      if (response.data.userId && response.data.token) {
        sessionStorage.setItem('userId', response.data.userId);
        sessionStorage.setItem('token', response.data.token);
        console.log('UserId:', response.data.userId);  // Debugging log
        console.log('Token:', response.data.token);  // Debugging log
      } else {
        console.log('Error: userId or token is missing in the response');
      }
  
      setSuccessMessage('Successfully logged in!');
      if (response.data.role === 'customer') {
        navigate('/');
      } else {
        navigate('/seller-dashboard');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Login credentials failed');
      setSuccessMessage('');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Login</h2>
      {successMessage && <p style={styles.successMessage}>{successMessage}</p>}
      {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
      <form onSubmit={handleLogin} style={styles.form}>
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
          <label style={styles.label}>Login as: </label>
          <select value={role} onChange={(e) => setRole(e.target.value)} style={styles.select}>
            <option value="customer">Customer</option>
            <option value="seller">Seller</option>
          </select>
        </div>
        <button type="submit" style={styles.button}>Login</button>
      </form>
      <p style={styles.registerText}>
        Don't have an account? 
        <button onClick={() => navigate('/register')} style={styles.registerButton}>Register</button>
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
  successMessage: {
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: '10px',
  },
  errorMessage: {
    color: '#f44336',
    textAlign: 'center',
    marginBottom: '10px',
  },
  registerText: {
    color: '#cccccc',
    textAlign: 'center',
    marginTop: '20px',
  },
  registerButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ff6600',
    cursor: 'pointer',
    fontSize: '16px',
    marginLeft: '5px',
  },
};

export default Login;
