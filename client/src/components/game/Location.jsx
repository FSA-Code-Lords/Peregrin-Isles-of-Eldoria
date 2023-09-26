import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Inventory from "./Inventory";
import QuestLog from "./QuestLog";

const Location = ({ currentLocation, gameData, setGameData }) => {
  const [isHome, setIsHome] = useState(false);
  const navigate = useNavigate();

  const goToQuest = (questId) => {
    navigate(`/quest/${questId}`);
  };

  useEffect(() => {
    if (currentLocation.id === 1) {
      setGameData({
        ...gameData,
        character: { ...gameData.character, hp: gameData.character.maxHp },
      });

      localStorage.setItem(`gameData`, JSON.stringify(gameData));
      setIsHome(true);
    } else {
      setIsHome(false);
    }
  }, [currentLocation]);

  return (
    <div
      className="main-game"
      style={{ backgroundImage: `url(${currentLocation?.locationImg || ""})` }}
    >
      <div className="location-description">
        {currentLocation ? (
          <div>
            <h1>{currentLocation.name}</h1>
            <p>{currentLocation.description}</p>
          </div>
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
      {isHome ? (
        <section id="startTownSection">
          <Inventory gameData={gameData} />
          <QuestLog gameData={gameData} />
        </section>
      ) : null}
    </div>
  );
};

export default Location;
