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

  // Function to load a saved game when a button is clicked
  const loadSavedGame = (savedGame) => {
    localStorage.setItem("gameData", JSON.stringify(savedGame));
    alert("Game Successfully Loaded!"); // Optionally, you can show a message
    navigate("/game"); // Redirect to the game page
  };

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
                <button onClick={() => loadSavedGame(savedGame)}>
                  Load Game
                </button>
              </div>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default LoadGame;
