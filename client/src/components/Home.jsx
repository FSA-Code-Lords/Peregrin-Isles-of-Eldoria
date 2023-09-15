import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(``);
  console.log(token);

  useEffect(() => {
    const localToken = localStorage.getItem(`token`);
    localToken ? setToken(localToken) : null;
  }, []);

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
        {token ? (
          <>
            <button className="nav-button" onClick={() => navigate(`/newgame`)}>New Game</button>
            <button className="nav-button" onClick={() => navigate(`/loadgame`)}>Load Game</button>
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
      </div>
    </>
  );
};

export default Home;
