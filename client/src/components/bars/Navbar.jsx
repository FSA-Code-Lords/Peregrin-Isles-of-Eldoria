import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LoadGame from '../game/LoadGame';
import NewGame from '../game/NewGame';

const ButtonNavigation = () => {
  const navigate = useNavigate();

  const handleNewGameClick = () => {
    navigate('/newgame');
  };

  const handleLoadGameClick = () => {
    navigate('/loadgame');
  };

  return (
    <div className="button-navigation">
      <button className="nav-button" onClick={handleNewGameClick}>
        New Game
      </button>
      <button className="nav-button" onClick={handleLoadGameClick}>
        Load Game
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
        </Routes>
      </div>
    </>
  );
};

export default CustomNavbar;
