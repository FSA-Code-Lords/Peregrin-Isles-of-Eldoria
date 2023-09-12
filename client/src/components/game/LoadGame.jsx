import React, { useState, useEffect } from "react";


const LoadGame = () => {
  const [saveData, setsaveData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <div>
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
    </div>
  );
};

export default LoadGame;
