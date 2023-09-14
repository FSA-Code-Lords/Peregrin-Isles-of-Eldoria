import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import LoadGame from './game/LoadGame'
import NewGame from './game/NewGame';
import About from './About';
import Credits from './Credits';
import Profile from './Profile';
import Home from './Home';
import Game from './game/Game';
import Admin from './Admin';
import Users from "./Users";

const Router = () => {
  return (
    <Routes>
      <Route path="/users" element={<Users />} />
      <Route path="/game" element={<Game />} />
      <Route path="/newgame" element={<NewGame />} />
      <Route path="/userprofile" element={<Profile />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/loadgame" element={<LoadGame />} />
      <Route path="/credits" element={<Credits />} />
      <Route path="/about" element={<About />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default Router;
