import { useState } from "react";

const QuestLog = ({ gameData }) => {
  const [showQuests, setShowQuests] = useState(false);

  console.log(gameData);
  return (
    <section id="questLogSection">
      <h2 onClick={() => setShowQuests(!showQuests)}>QuestLog</h2>
      {showQuests ? (
        <section>
          <section>
            <h4>Incomplete Quests</h4>
            {gameData.quests.map((quest) => (
              <section key={quest.id}>
                <p>{quest.name}</p>
                <hr></hr>
              </section>
            ))}
          </section>
          <section>
            <h4>Completed Quests</h4>
            {gameData.completedQuests.map((quest) => (
              <section key={quest.id}>
                <p>{quest.name}</p>
                <hr></hr>
              </section>
            ))}
          </section>
        </section>
      ) : null}
    </section>
  );
};

export default QuestLog;
