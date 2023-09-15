import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const [users, setUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [changesHappened, setChangesHappened] = useState(false);

  const navigate = useNavigate();

  const token = localStorage.getItem(`token`);

  useEffect(() => {
    if (localStorage.getItem(`token`)) {
      const tokenArr = localStorage.getItem(`token`).split(`.`);
      const { id } = JSON.parse(atob(tokenArr[1]));

      checkIfAdmin(id);
    }
  }, [changesHappened]);

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
    navigate('/register');
  };

  const handleCreditsClick = () => {
    navigate('/credits');
  }

  const handleAboutClick = () => {
    navigate('/about');
  }

  const handleLogInClick = () => {
    navigate('/login');
  };

  const handleAdminClick = () => {
    navigate('/admin');
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
          <button className="nav-button" onClick={handleNewUserClick}>
            Register New User
          </button>
          <button className="nav-button" onClick={handleLogInClick}>
            Users Log In
          </button>
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
          ) : (<p>[Admin Placeholder]</p> 
  )}
        </div>
    </>
  );
};

export default Home;
