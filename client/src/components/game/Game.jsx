import React, { useState } from 'react';

const Game = () => {
  const [currentLocation, setCurrentLocation] = useState('Start Town');
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
        <button onClick={() => handleChoiceClick('Forest')}>Go to North Forest</button>
        <button onClick={() => handleChoiceClick('Swamp')}>Go to Murky Swamp</button>
        <button onClick={() => handleChoiceClick('Tavern')}>Go to O'Doyle's Tavern</button>
        <button onClick={() => handleChoiceClick('Market')}>Go to Mercantile Market</button>
        <button onClick={() => handleChoiceClick('Castle Front')}>Go to Eldoria Castle</button>
        <button onClick={() => handleChoiceClick('Castle Interior')}>Enter Eldoria Castle</button>
      </div>
    </div>
  );
};

export default Game;
