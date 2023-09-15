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
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        console.log(data);
        localStorage.setItem('token', token);

        setLoginSuccess(true);
        setShowGameOptions(true);
      } else {
        console.error('Login failed:', response.statusText);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleOkClick = () => {
    navigate('/newgame');
  };

  const handleMainMenuClick = () => {
    navigate('/');
  };

  const handleLoadGameClick = () => {
    navigate('/loadgame');
  };

  const handleProfileClick = () => {
    navigate('/userprofile');
  }

  return (
    <div className="formstyle">
      <div className="form-container">
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
          <button id="login-button" type="submit">
            Login
          </button>
        </form>
        <button onClick={handleMainMenuClick}>Return to Main Menu</button>
        {loginSuccess ? (
          <div>
            {showGameOptions ? (
              <div>
                <p>Login Successful! Enjoy exploring the Isles of Eldoria!</p>
                <button id="new-game-button" onClick={handleOkClick}>
                  New Game
                </button>
                <button id="load-game-button" onClick={handleLoadGameClick}>
                  Load Game
                </button>
                <button id="profile-button" onClick={handleProfileClick}>
                  User Profile
                </button>
              </div>
            ) : (
              <button id="ok-button" onClick={handleOkClick}>
                Ok
              </button>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Login;
