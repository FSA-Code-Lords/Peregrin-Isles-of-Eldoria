import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Quest = () => {
  const [saveState, setSaveState] = useState({});
  const [quest, setQuest] = useState({});
  const [choiceSelection, setChoiceSelection] = useState([]);
  const [choice, setChoice] = useState({});
  const [monsters, setMonsters] = useState([]);
  const [chosenMonster, setChosenMonster] = useState({});
  const [isMyTurn, setIsMyTurn] = useState(null);
  const [log, setLog] = useState(``);
  const { id } = useParams();

  const navigate = useNavigate();

  // initial load
  useEffect(() => {
    if (!saveState.character) {
      const gameData = JSON.parse(localStorage.getItem(`gameData`));
      setSaveState(gameData);

      const sentQuest = gameData.quests.find(
        (quest) => quest.id === Number(id)
      );

      setQuest(sentQuest);
      setMonsters(sentQuest.monsters);
      setChoiceSelection(sentQuest.choices);
      setLog(log + `_You have ${gameData.character.hp} health`);
    }
  }, []);

  // determines who attacks
  useEffect(() => {
    if (choice.name) {
      yourTurn();
    } else if (isMyTurn === false && chosenMonster.hp > 0) {
      monstersTurn();
    }
  }, [isMyTurn, choice]);

  // updates log when monster attacks
  useEffect(() => {
    if (chosenMonster.name) {
      if (chosenMonster.hp > 0) {
        if (saveState.character.hp <= 0) {
          setChoiceSelection([]);
          setMonsters([]);

          setLog(
            log +
              `_${chosenMonster.name} attacks!` +
              `_You now have ${saveState.character.hp} health` +
              `_${quest.failedMessage}`
          );
        } else {
          setLog(
            log +
              `_${chosenMonster.name} attacks!` +
              `_You now have ${saveState.character.hp} health`
          );
        }
      }
    }
  }, [saveState]);

  // updated log when user attacks
  useEffect(() => {
    chosenMonster.name
      ? setLog(log + `_${chosenMonster.name} has ${chosenMonster.hp} health`)
      : null;

    if (chosenMonster.hp <= 0) {
      setChoiceSelection([]);

      setLog(
        log +
          `_${chosenMonster.name} has fallen` +
          `_You've obtained: ${quest.items.map((item) => `${item.name}, `)}`
      );

      saveState.map.forEach((location) => {
        location.quests.forEach((locationQuest) => {
          if (locationQuest.name === quest.name) {
            const index = location.quests.indexOf(quest);
            location.quests.splice(index, 1);
          }
        });
      });
      const index = saveState.quests.indexOf(quest);
      saveState.quests.splice(index, 1);

      quest.monsters.forEach((monster) => {
        if (monster.name === chosenMonster.name) {
          const index = quest.monsters.indexOf(monster);
          quest.monsters.splice(index, 1);
        }
      });

      quest.items.forEach((item) => {
        saveState.inventory.push(item);
        const index = quest.items.indexOf(item);
        quest.items.splice(index, 1);
      });

      setQuest({ ...quest, isCompleted: true });

      saveState.completedQuests.push(quest);

      const newSaveState = { ...saveState };

      setSaveState(newSaveState);

      localStorage.setItem(`gameData`, JSON.stringify(saveState));
    }
  }, [chosenMonster]);

  const yourTurn = () => {
    if (choice.result.includes(`Damage`)) {
      const dodgeChance = Math.ceil(Math.random() * 100);

      if (chosenMonster.dodge >= dodgeChance) {
        setLog(log + `_${chosenMonster.name} dodged!`);
        setChoice({});
        setIsMyTurn(false);
      } else {
        setChosenMonster({
          ...chosenMonster,
          hp: chosenMonster.hp - saveState.character.atk,
        });
        setChoice({});
        setIsMyTurn(false);
      }
    } else if (choice.result.includes(`Sneaking`)) {
      const sneakChance = Math.floor(Math.random() * 4);
      if (sneakChance < 1) {
        setLog(log + `_${choice.result} success!`);
      } else {
        setLog(log + `_${choice.result} failed. You are attacked!`);
        setChoice({});
        monstersTurn();
      }
    }
  };

  const monstersTurn = () => {
    const dodgeChance = Math.ceil(Math.random() * 100);

    if (saveState.character.dodge >= dodgeChance) {
      setLog(log + `_You dodged!`);
      setIsMyTurn(true);
    } else {
      setSaveState({
        ...saveState,
        character: {
          ...saveState.character,
          hp: saveState.character.hp - chosenMonster.atk,
        },
      });
      setIsMyTurn(true);
    }
  };

  const choiceClickHandler = (id) => {
    fetchChoice(id);
  };

  const fetchChoice = async (id) => {
    try {
      const response = await fetch(`/api/choices/${id}`);
      const data = await response.json();

      setChoice(data);
      setChoiceSelection(data.followUpChoices);
      setLog(log + `_${data.action}`);
    } catch (error) {
      console.log(error);
    }
  };

  const selectHandler = (event) => {
    setChosenMonster(JSON.parse(event.target.value));
  };

  return (
    <section className="formstyle">
      <section className="form-container">
        <h1>Quest: {quest.name}</h1>
        <p>{quest.description}</p>
        <section>
          <p>What would you like to do?</p>
          <select onChange={selectHandler}>
            {!chosenMonster.name ? <option>Select Monster</option> : null}
            {monsters.map((monster) => (
              <option key={monster.id} value={JSON.stringify(monster)}>
                {monster.name}
              </option>
            ))}
          </select>
          {choiceSelection.length === 0 ? (
            <button onClick={() => navigate(`/game`)}>Return Home</button>
          ) : null}
          <br />
          <br />
          {chosenMonster.name
            ? choiceSelection.map((choice) => (
                <button
                  key={choice.id}
                  onClick={() => choiceClickHandler(choice.id)}
                >
                  {choice.name}
                </button>
              ))
            : null}
        </section>
        <section>
          {log.split(`_`).map((singleLog, index) => (
            <p key={index}>{singleLog}</p>
          ))}
        </section>
      </section>
    </section>
  );
};

export default Quest;
