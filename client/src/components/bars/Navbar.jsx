import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LoadGame from '../game/LoadGame';
import NewGame from '../game/NewGame';
import About from '../About';
import Credits from '../Credits';

const ButtonNavigation = () => {
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
  );
};

const CustomNavbar = () => {
  return (
    <>
      <ButtonNavigation />
      <div>
        <Routes>
          <Route path="/newgame" element={<NewGame />} />
          <Route path="/loadgame" element={<LoadGame />} />
          <Route path="/credits" element={<Credits />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </>
  );
};

export default CustomNavbar;
