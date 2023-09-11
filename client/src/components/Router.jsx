import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoadGame from './game/LoadGame'
import NewGame from './game/NewGame';
import About from './About';
import Credits from './Credits';
import Home from './Home';

const Router = () => {
  return (
    <Routes>
      <Route path="/newgame" element={<NewGame />} />
      <Route path="/loadgame" element={<LoadGame />} />
      <Route path="/credits" element={<Credits />} />
      <Route path="/about" element={<About />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default Router;
