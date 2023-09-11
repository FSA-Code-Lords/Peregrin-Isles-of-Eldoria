import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [showGameOptions, setShowGameOptions] = useState(false);
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

 
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;

        // Store the token
      } else {
        console.error('Login failed:', response.statusText);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleOkClick = () => {
    setLoginSuccess(true);
    setShowGameOptions(true);
  }

  const handleNewGameClick = () => {
    navigate('/newgame');
  }

  const handleLoadGameClick = () => {
    navigate('/loadgame');
  }

  return (
    <div>
      <h2>User Login</h2>
      {loginSuccess ? (
        <div>
          {showGameOptions ? (
            <div>
              <p>Login Successful! Enjoy exploring the Isles of Eldoria!</p>
              <button onClick={handleNewGameClick}>New Game</button>
              <button onClick={handleLoadGameClick}>Load Game</button>
            </div>
          ) : (
            <button onClick={handleOkClick}>Ok</button>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
};
  

export default Login;