import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoadGame = () => {
  const [saveData, setSaveData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const localStorageData = JSON.parse(localStorage.getItem("gameData"));
      if (localStorageData) {
        setSaveData([localStorageData]);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading saved game data:", error);
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="formstyle">
      <div className="form-container">
        <h1>Load Game</h1>
        {isLoading ? (
          <p>Loading saved games...</p>
        ) : (
          <ul>
            {saveData.map((savedGame, index) => (
              <div key={index}>
                <h2>{savedGame.character.name}</h2>
                <p>Race: {savedGame.character.race}</p>
                <p>Class: {savedGame.character.class}</p>
                {/* Add more details as needed */}
              </div>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default LoadGame;
