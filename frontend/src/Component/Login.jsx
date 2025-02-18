import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    const user = {
      username: username,
      password: password,
    };
  
    try {
      const { data } = await axios.post(
        'http://localhost:8000/token/', 
        user,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
  
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;
      window.location.href = '/login';
    } catch (error) {
      console.error("Login failed:", error.response); 
      alert('Login failed. Please check your credentials or try again later.');
    }
  };

  return (
    <div className="cont">
      <form className="form" onSubmit={submit}>
        <div className="form-content">
          <h3 className="form-title">Login</h3>
          <div className="box">
            <label>Username</label>
            <input
              className="box"
              placeholder="Enter Username"
              name="username"
              type="text"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="box">
            <label>Password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="button">
            <button type="submit" className="b1">
              Submit
            </button>
          </div>
        </div>
      </form>
      <div className="text">
        <p>Don't have an account? <Link to="/register">Register here</Link></p>
      </div>
    </div>
  );
};
