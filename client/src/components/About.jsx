import React from "react";
import { useNavigate } from "react-router-dom";


const About = () => {
  const navigate = useNavigate();

  const handleMainMenuClick = () => {
    navigate("/");
  };
  return (
    <>
      <div className="formstyle">
        <div className="form-container">
          <h1>Mostly-Necessary Game Information</h1>
          <div className="menubutton-container">
          <button onClick={handleMainMenuClick}>Return to Main Menu</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
