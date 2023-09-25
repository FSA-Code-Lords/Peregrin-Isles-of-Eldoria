import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ isLoggedIn }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem(`token`)) {
      const tokenArr = localStorage.getItem(`token`).split(`.`);
      const { id } = JSON.parse(atob(tokenArr[1]));

      checkIfAdmin(id);
    }
  }, [isLoggedIn]);

  const checkIfAdmin = async (id) => {
    try {
      const response = await fetch(`/api/users/${id}`);
      const result = await response.json();
      setIsAdmin(result.isAdmin);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNewUserClick = () => {
    navigate("/register");
  };

  const handleCreditsClick = () => {
    navigate("/credits");
  };

  const handleAboutClick = () => {
    navigate("/about");
  };

  const handleLogInClick = () => {
    navigate("/login");
  };

  const handleAdminClick = () => {
    navigate("/admin");
  };

  return (
    <>
      <div className="wall-sconces-logo-container">
        <div className="wall-sconce">
          <div className="flame"></div>
        </div>
        <figure className="mainlogo-container">
          <h1 className="logo-text">Peregrin Isles of Eldoria</h1>
        </figure>
        <div className="wall-sconce">
          <div className="flame"></div>
        </div>
      </div>
      <div id="button-container">
        {isLoggedIn ? (
          <>
            <button className="nav-button" onClick={() => navigate(`/newgame`)}>
              New Game
            </button>
            <button
              className="nav-button"
              onClick={() => navigate(`/loadgame`)}
            >
              Load Game
            </button>
          </>
        ) : (
          <>
            <button className="nav-button" onClick={handleNewUserClick}>
              Register New User
            </button>
            <button className="nav-button" onClick={handleLogInClick}>
              Users Log In
            </button>
          </>
        )}
        <button className="nav-button" onClick={handleAboutClick}>
          About Game
        </button>
        <button className="nav-button" onClick={handleCreditsClick}>
          Credits
        </button>
        {isAdmin ? (
          <button className="nav-button" onClick={handleAdminClick}>
            Secret Admin Button
          </button>
        ) : null}
      </div>
    </>
  );
};

export default Home;
