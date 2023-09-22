import React, { useState, useEffect } from 'react';

const Game = () => {
  const [currentLocation, setCurrentLocation] = useState(`1`);
  const [selectedLocationId, setSelectedLocationId] = useState(``);
  const [locationOptions, setLocationOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [gameData, setGameData] = useState(null);

  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem("gameData"));
    const options = localStorageData.map.map((location) => (
      <option key={location.id} value={location.id}>
        {location.name}
      </option>
    ));
    setGameData(localStorageData);
    setLocationOptions(options);
    handleTravelClick(1);
  }, []);

  const handleTravelClick = async (id) => {
    setIsLoading(true);

    try {
      const response = await fetch(`/api/locations/${id}`);
      const locationData = await response.json();

      setCurrentLocation(locationData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching location data:', error);
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
  

  return (
    <div className="main-game" style={{ backgroundImage: `url(${currentLocation?.locationImg || ''})` }}>
      <div className="location-description">
        {currentLocation ? (
          <div>
            <h1>{currentLocation.name}</h1>
            <p>{currentLocation.description}</p>
          </div>
        ) : null}
      </div>
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
        <button onClick={() => handleTravelClick(selectedLocationId)} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Travel'}
        </button>
        <button onClick={saveGame}>Save Game</button>
      </div>
    </div>
  );
};

export default Game;