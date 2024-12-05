import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
function SignUp() {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [message, setMessage] = useState('');
  const navigate=useNavigate();
  // Handle input changes
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = credentials;

    if (password !== confirmPassword) {
      setMessage('Passwords do not match!');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/createuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('User registered successfully!');
        setCredentials({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        navigate('/')
      } else {
        setMessage(result.error || 'Something went wrong!');
      }
    } catch (error) {
      console.error('Error during API call:', error);
      setMessage('Unable to connect to the server. Please try again later.');
    }
  };

  return (
    <div className='container my-3' style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Sign Up</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={credentials.name}
            onChange={handleChange}
            minLength={3}
            required 
            style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required 
            style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box' }} style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            minLength={5}
            required 
            style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box' }} style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={credentials.confirmPassword}
            onChange={handleChange}
            minLength={5}
            required 
            style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box' }}
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '4px' }}>
            Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
