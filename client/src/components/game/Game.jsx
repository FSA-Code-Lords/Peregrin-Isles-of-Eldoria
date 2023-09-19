import React, { useState, useEffect } from 'react';

const Game = () => {
  const [currentLocationData, setCurrentLocationData] = useState(null);

  useEffect(() => {
    const fetchStartTownData = async () => {
      try {
        const response = await fetch(`/api/locations/1`);
        const locationData = await response.json();
        setCurrentLocationData(locationData);
      } catch (error) {
        console.error('Error fetching Start Town data:', error);
      }
    };

    fetchStartTownData();
  }, []); // Only fetch data when the component mounts

  return (
    <div className="main-game" style={{ backgroundImage: currentLocationData?.locationImg ? `url(${currentLocationData.locationImg})` : 'none', height: '100vh', backgroundSize: 'cover' }}>
      <div className="location-description">
        {currentLocationData && (
          <div>
            <h2>{currentLocationData.name}</h2>
            <p>{currentLocationData.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;
