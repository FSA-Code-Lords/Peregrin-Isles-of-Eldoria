import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      console.error('User ID not found');
      setIsLoading(false);
      return;
    }

    Promise.all([
      fetch(`/api/users/${userId}`),
      fetch('/api/saveData'),
    ])
      .then((responses) => Promise.all(responses.map((res) => res.json())))
      .then(([userDataResponse, savedGameDataResponse]) => {
        setUserData({
          username: userDataResponse.username,
          savedGames: savedGameDataResponse,
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>User Profile</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : userData ? (
        <>
          <h2>{userData.username}</h2>
          <div>
            <h3>Saved Games:</h3>
            <ul>
              {userData.savedGames.map((game, index) => (
                <li key={index}>{game.name}</li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <p>Error fetching user data.</p>
      )}
    </div>
  );
};

export default Profile;