import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleNewGameClick = () => {
    navigate('/newgame');
  };

  const handleCreditsClick = () => {
    navigate('/credits');
  }

  const handleAboutClick = () => {
    navigate('/about');
  }

  const handleLoadGameClick = () => {
    navigate('/loadgame');
  };

  return (
    <>
      <figure className="mainlogo-container">
        <h1 className="logo-text">Peregrin Isles of Eldoria</h1>
      </figure>
      <div id="button-container">
        <button className="nav-button" onClick={handleNewGameClick}>
          New Game
        </button>
        <button className="nav-button" onClick={handleLoadGameClick}>
          Load Game
        </button>
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
