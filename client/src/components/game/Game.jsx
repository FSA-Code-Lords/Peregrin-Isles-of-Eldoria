import React, { useState, useEffect } from 'react';

const Game = () => {
  const [currentLocation, setCurrentLocation] = useState('Start Town');
  const [currentLocationData, setCurrentLocationData] = useState(null);
  const [currentLocationOpacity, setCurrentLocationOpacity] = useState(1);

  const locationBackgrounds = {
    'Start Town': 'https://cdnb.artstation.com/p/assets/images/images/027/950/891/small/david-vaz-highresscreenshot00002.jpg',
    'Forest': 'https://twistedsifter.com/wp-content/uploads/2019/04/mystical-by-nei-burnell-2.jpg',
    'Swamp': 'https://cdna.artstation.com/p/assets/images/images/001/063/810/large/nicolas-chacin-pantanopantalla.jpg',
    'Tavern': 'https://cdn1.epicgames.com/ue/product/Screenshot/01-1920x1080-dcbf2aaa619b9debe3aef9922f89d316.png',
    'Market': 'https://storage.googleapis.com/pai-images/6410f6f42dd84829a7b25bf8f65ba543.jpeg',
    'Castle Front': 'https://rare-gallery.com/resol/1366x768/502322-fantasy-art.jpg',
    'Castle Interior': 'https://wallpaperaccess.com/full/1274092.jpg'
  };

  useEffect(() => {
    // Simulate fetching data for the current location from your API
    const fetchLocationData = async () => {
      try {
        const response = await fetch(`/api/locations/${currentLocation}`);
        const locationData = await response.json();
        setCurrentLocationData(locationData);
      } catch (error) {
        console.error('Error fetching location data:', error);
      }
    };

    fetchLocationData();
  }, [currentLocation]);

  const handleChoiceClick = (newLocation) => {
    setCurrentLocationOpacity(0);

    setTimeout(() => {
      setCurrentLocation(newLocation);
      setCurrentLocationOpacity(1);
    }, 100);
  };

  return (
    <div className="main-game" style={{ backgroundImage: `url(${locationBackgrounds[currentLocation]})`, opacity: currentLocationOpacity, height: '100vh', transition: 'opacity 0.5s ease-in-out' }}>
      <div className="choice-buttons">
        {currentLocationData && currentLocationData.choices ? (
          currentLocationData.choices.map((choice) => (
            <button
              key={choice.id}
              onClick={() => handleChoiceClick(choice.nextLocation)}
            >
              {choice.name}
            </button>
          ))
        ) : (
          <p>No choices available at this location.</p>
        )}
      </div>
    </div>
  );
};

export default Game;
