import { useState } from 'react';
import axios from 'axios';

export const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const submit = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
  
    const user = {
      username: username,
      email: email,
      password: password,
      password2: confirmPassword, 
    };
  
    try {
      const response = await axios.post('http://localhost:8000/register/', user, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(response.data); 
      alert('Registration successful! Please log in.');
      window.location.href = '/login';  
    } catch (error) {
      console.error('Registration error:', error.response); 
      alert('An error or User already exists!');
    }
  };

  return (
    <div className="cont">
      <form className="form" onSubmit={submit}>
        <div className="form-content">
          <h3 className="form-title">Signup</h3>
          <div className="box">
            <label>Username</label>
            <input
              className="form-control"
              placeholder="Enter Username"
              name="username"
              type="text"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="box">
            <label>Email</label>
            <input
              className="form-control"
              placeholder="Enter Email"
              name="email"
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="box">
            <label>Password</label>
            <input
              className="form-control"
              placeholder="Enter Password"
              name="password"
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="box">
            <label>Confirm Password</label>
            <input
              className="form-control"
              placeholder="Confirm Password"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="button">
            <button type="submit" className="b1">
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
