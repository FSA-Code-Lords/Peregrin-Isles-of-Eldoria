import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(`token`);
    const tokenArr = token.split(`.`);
    const userId = JSON.parse(atob(tokenArr[1])).id;

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
    <div className='formstyle'>
      <div className='form-container'>
        <h1>User Profile</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : userData ? (
          <>
            <h2>{userData.username}</h2>
            <div>
              <h3>Saved Games:</h3>
              <ul>
                {userData.savedGames.map((game, index) => {
                  const parsedGame = JSON.parse(game.serializedData);
                  return (
                    <li key={index}>
                      <h4>Game {index + 1}</h4>
                      <div>
                        <h5>Character Info:</h5>
                        {parsedGame.character && (
                          <>
                            <p>Name: {parsedGame.character.name}</p>
                            <p>Race: {parsedGame.character.race}</p>
                            <p>Class: {parsedGame.character.class}</p>
                            <p>HP: {parsedGame.character.hp}</p>
                            <p>Attack: {parsedGame.character.atk}</p>
                          </>
                        )}
                      </div>
                      <div>
                        <h5>Quests:</h5>
                        <ul>
                          {parsedGame.quests &&
                            parsedGame.quests.map((quest, questIndex) => (
                              <li key={questIndex}>
                                {quest.name && (
                                  <p>Quest Name: {quest.name}</p>
                                )}
                                {quest.description && (
                                  <p>Quest Description: {quest.description}</p>
                                )}
                              </li>
                            ))}
                        </ul>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </>
        ) : (
          <p>Error fetching user data.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
