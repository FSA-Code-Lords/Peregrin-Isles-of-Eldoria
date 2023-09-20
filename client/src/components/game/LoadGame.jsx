import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const LoadGame = () => {
  const [saveData, setsaveData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const navigate = useNavigate();

  useEffect(() => {
    const tokenArr = localStorage.getItem(`token`).split(`.`);
    const { id } = JSON.parse(atob(tokenArr[1]));
    fetch(`/api/saveData/${id}`)
      .then((response) => response.json())
      .then((dataArray) => {
        const parseDataArray = dataArray.map((data) => {
          return JSON.parse(data.serializedData);
        })
        setsaveData(parseDataArray);
        console.log(`parseDataArray below`);
        console.log(parseDataArray);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching saved games:', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="formstyle">
      <div className="form-container">
        <h1>Load Game</h1>
        {isLoading ? (
          <p>Loading saved games...</p>
        ) : (
          <ul>
            {saveData.map((saveData) => (
              <p key={saveData.id}>
                {/* Render saved game details here */}
                <h2>{saveData.character.name}</h2>
                <p>Race: {saveData.character.race}</p>
                <p>Class: {saveData.character.class}</p>
                {/* Add more details as needed */}
              </p>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default LoadGame;
