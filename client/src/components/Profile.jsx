import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoading(false);
      return;
    }

    const tokenArr = token.split('.');
    const userId = JSON.parse(atob(tokenArr[1])).id;

    if (!userId) {
      console.error('User ID not found');
      setIsLoading(false);
      return;
    }

    Promise.all([
      fetch(`/api/users/${userId}`),
      fetch(`/api/saveData/user/${userId}`),
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
    <div className="formstyle">
      <div className="form-container">
        <h1>User Profile</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : userData ? (
          <>
            <h2>{userData.username}</h2>
            <div>
              <div>
                {userData.savedGames.map((game, index) => {
                  const parsedGame = JSON.parse(game.serializedData);
                  return (
                    <div key={index}>
                      <h3>Game {index + 1}: {parsedGame.character.name}</h3>
                      <div>
                        {parsedGame.character && (
                          <>
                            <p><b>Race:</b> {parsedGame.character.race}. <b>Class:</b> {parsedGame.character.class}.</p>
                            <p><b>HP: </b>{parsedGame.character.hp}. <b>Attack:</b> {parsedGame.character.atk}.</p>
                          </>
                        )}
                      </div>
                      <hr></hr>
                      <div>
                        <h4>Quests:</h4>
                        <div>
                          {parsedGame.quests &&
                            parsedGame.quests.map((quest, questIndex) => (
                              <div key={questIndex}>
                                {quest.name && (
                                  <p>Quest Name: {quest.name}</p>
                                )}
                                {quest.description && (
                                  <p>Quest Description: {quest.description}</p>
                                )}
                              <hr></hr>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
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
