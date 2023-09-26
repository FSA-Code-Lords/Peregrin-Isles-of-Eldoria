import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoadGame = () => {
  const [saveDatas, setSaveDatas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const tokenArr = localStorage.getItem(`token`).split(`.`);
      const { id } = JSON.parse(atob(tokenArr[1]));

      fetchSavedDatas(id);

      setIsLoading(false);
    } catch (error) {
      console.error("Error loading saved game data:", error);
      setIsLoading(false);
    }
  }, []);

  const fetchSavedDatas = async (id) => {
    try {
      const response = await fetch(`/api/saveData/user/${id}`);
      const result = await response.json();

      const saveDataArr = result.map((saveData) =>
        JSON.parse(saveData.serializedData)
      );

      setSaveDatas(saveDataArr);
    } catch (error) {
      console.log(error);
    }
  };

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
            {saveDatas.map((savedGame, index) => (
              <div
                key={index}
                className="loadGame"
                onClick={() => loadSavedGame(savedGame)}
              >
                <span className="characterName">{savedGame.character.name}</span>
                <span><b>Race</b>: {savedGame.character.race}</span>
                <span><b>Class</b>: {savedGame.character.class}</span>
              </div>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default LoadGame;
