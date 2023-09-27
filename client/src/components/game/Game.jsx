import React, { useState, useEffect } from "react";
import Location from "./Location";

const Game = () => {
  const [currentLocation, setCurrentLocation] = useState(``);
  const [selectedLocationId, setSelectedLocationId] = useState(``);
  const [locationOptions, setLocationOptions] = useState([]);
  const [map, setMap] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [gameData, setGameData] = useState(null);

  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem("gameData"));
    const options = localStorageData.map.map((location) => (
      <option key={location.id} value={location.id}>
        {location.name}
      </option>
    ));
    setMap(localStorageData.map);
    setGameData(localStorageData);
    setLocationOptions(options);
  }, []);

  useEffect(() => {
    handleTravelClick(1);
  }, [map]);

  const handleTravelClick = (id) => {
    setIsLoading(true);

    if (map.length > 0) {
      const location = map.find((location) => location.id === Number(id));
      setCurrentLocation(location);
      setIsLoading(false);
    }
  };

  // updates data when healed in start town
  useEffect(() => {
    localStorage.setItem(`gameData`, JSON.stringify(gameData));
  }, [gameData]);

  const saveGame = async () => {
    try {
      const token = localStorage.getItem(`token`);
      const tokenArr = token.split(`.`);
      const { id } = JSON.parse(atob(tokenArr[1]));

      localStorage.setItem("gameData", JSON.stringify(gameData));
      const response = await fetch(`/api/saveData/${gameData.saveDataId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          serializedData: JSON.stringify(gameData),
        }),
      });

      const result = await response.json();

      console.log(result);

      alert("Game Successfully Saved!");
    } catch (error) {
      console.error("Error saving game data:", error);
    }
  };

  return (
    <>
      <Location
        currentLocation={currentLocation}
        gameData={gameData}
        setGameData={setGameData}
      />
      <div className="choice-buttons">
        <select
          id="locationSelect"
          name="location"
          onChange={(event) => setSelectedLocationId(event.target.value)}
          value={selectedLocationId}
        >
          {locationOptions}
        </select>
        <button
          onClick={() => handleTravelClick(selectedLocationId)}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Travel"}
        </button>
        <button onClick={saveGame}>Save Game</button>
      </div>
    </>
  );
};

export default Game;
