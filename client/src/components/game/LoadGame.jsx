import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const LoadGame = () => {
  const [saveData, setsaveData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/saveData')
      .then((response) => response.json())
      .then((data) => {
        setsaveData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching saved games:', error);
        setIsLoading(false);
      });
  }, []);

  const handleMainMenuClick = () => {
    navigate("/");
  };

  return (
    <div className="formstyle">
      <div className="form-container">
        <h1>Load Game</h1>
        {isLoading ? (
          <p>Loading saved games...</p>
        ) : (
          <ul>
            {saveData.map((saveData) => (
              <li key={saveData.id}>
                {/* Render saved game details here */}
                <p>Name: {saveData.name}</p>
                <p>Race: {saveData.race}</p>
                <p>Class: {saveData.class}</p>
                {/* Add more details as needed */}
              </li>
            ))}
          </ul>
        )}
        <button onClick={handleMainMenuClick}>Return To Main Menu</button>
      </div>
    </div>
  );
};

export default LoadGame;
