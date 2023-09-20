import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleMainMenuClick = () => {
    navigate("/");
  };

  const handleLogoutClick = () => {
    localStorage.removeItem(`token`);
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div id="navBar">
      {isLoggedIn && (
        <button className="nav-button" onClick={handleLogoutClick}>
          Log Out
        </button>
      )}
      <button className="nav-button" onClick={handleMainMenuClick}>
        Main Menu
      </button>
    </div>
  );
};

export default Navbar;
