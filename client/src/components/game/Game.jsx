import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Game = () => {
  const [currentLocation, setCurrentLocation] = useState(``);
  const [selectedLocationId, setSelectedLocationId] = useState(``);
  const [locationOptions, setLocationOptions] = useState([]);
  const [map, setMap] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [gameData, setGameData] = useState(null);
  const navigate = useNavigate(); // Import the useNavigate hook

  console.log(gameData);

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

  const handleLocationChange = (event) => {
    setSelectedLocationId(event.target.value);
  };

  const saveGame = () => {
    try {
      localStorage.setItem("gameData", JSON.stringify(gameData));
      alert("Game Successfully Saved!");
    } catch (error) {
      console.error("Error saving game data:", error);
    }
  };

  const goToQuest = (questId) => {
    // Use navigate to route to /quest
    navigate(`/quest/${questId}`);
  };

  return (
    <div
      className="main-game"
      style={{ backgroundImage: `url(${currentLocation?.locationImg || ""})` }}
    >
      <div className="location-description">
        {currentLocation ? (
          <>
            <div>
              <h1>{currentLocation.name}</h1>
              <p>{currentLocation.description}</p>
            </div>
          </>
        ) : null}
      </div>
      {currentLocation.quests ? (
        currentLocation.quests.length > 0 ? (
          <section className="quest-container">
            <h3>Quests</h3>
            {currentLocation.quests.map((quest) => (
              <section
                key={quest.id}
                className="quest"
                onClick={() => goToQuest(quest.id)}
              >
                <p>{quest.name}</p>
                <p>{quest.description}</p>
              </section>
            ))}
          </section>
        ) : null
      ) : null}
      <div className="choice-buttons">
        <select
          id="locationSelect"
          name="location"
          onChange={handleLocationChange}
          value={selectedLocationId}
        >
          <option value="">Select a Location</option>
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
    </div>
  );
};

export default Game;
