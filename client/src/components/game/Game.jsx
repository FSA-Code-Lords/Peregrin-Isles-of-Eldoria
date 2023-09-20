import React, { useState, useEffect } from 'react';

const Game = () => {
  const [currentLocation, setCurrentLocation] = useState(`1`);
  const [selectedLocationId, setSelectedLocationId] = useState(``);
  const [locationOptions, setLocationOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAllLocations = async () => {
      try {
        // Make an API request to fetch all location data
        const response = await fetch('/api/locations');
        const locations = await response.json();

        // Map location data to options for the dropdown
        const options = locations.map((location) => (
          <option key={location.id} value={location.id}>
            {location.name}
          </option>
        ));

        // Set the location options in the state
        setLocationOptions(options);
      } catch (error) {
        console.error('Error fetching location data:', error);
      }
    };

    fetchAllLocations();
    handleTravelClick(1);
  }, []);

  const handleTravelClick = async (id) => {
    setIsLoading(true);

    try {
      // Make an API request to fetch location data based on selectedLocationId
      const response = await fetch(`/api/locations/${id}`);
      const locationData = await response.json();

      // Update the current location, including background image, and stop loading
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
      </div>
    </div>
  );
};

export default Game;
