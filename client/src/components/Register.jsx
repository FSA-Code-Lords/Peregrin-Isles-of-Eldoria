import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      window.alert("Passwords do not match. Please try again.");
      return;
    }

    try {
      const response = await fetch("/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;

        localStorage.setItem(`token`, token);

        window.alert(
          "Successfully Registered! Prepare to explore the Isles of Eldoria!"
        );
        navigate("/newgame");
      } else {
        console.error("Registration failed:", response.statusText);
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const handleMainMenuClick = () => {
    navigate("/");
  };

  return (
    <div className='formstyle'>
      <div className='form-container'>
        <h2>User Registration</h2>
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
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Register</button>
        </form>
        <button onClick={handleMainMenuClick}>Return to Main Menu</button>
      </div>
    </div>
  );
};

export default Register;
