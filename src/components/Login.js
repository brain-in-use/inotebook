import React, { useState,useContext } from 'react';
import { useNavigate} from 'react-router-dom';
import NoteContext from '../context/notes/NoteContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate=useNavigate();
  const {showAlert}=useContext(NoteContext);
  const handleSubmit = async(e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
  const response = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: {
      // Use headers (plural) instead of header
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password}),
  });

  const json = await response.json();

    setError('');
    // Handle login logic here (e.g., call an API)
    console.log('Login submitted:', { email, password },json);
    if(json.success){
        localStorage.setItem('token',json.authToken);
        navigate('/');
        showAlert('Logged In','success');
    }
    else{
        alert("Invalid Credentials")
    }
  };

  return (
    <div className='container my-3' style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="email">Email:</label>
          <br />
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box' }}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="password">Password:</label>
          <br />
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box' }}
            required
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '4px' }}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
