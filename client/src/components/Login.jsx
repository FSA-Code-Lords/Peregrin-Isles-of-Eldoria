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
    <div className='formstyle'>
      <div className='form-container'>
        <h2>User Login</h2>
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
          <button id='login-button' type="submit">Login</button>
        </form>
        {loginSuccess ? (
          <div>
            {showGameOptions ? (
              <div>
                <p>Login Successful! Enjoy exploring the Isles of Eldoria!</p>
                <button id='new-game-button' onClick={handleNewGameClick}>New Game</button>
                <button id='load-game-button' onClick={handleLoadGameClick}>Load Game</button>
              </div>
            ) : (
              <button id='ok-button' onClick={handleOkClick}>Ok</button>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
  
};
  

export default Login;