import { useEffect, useState } from "react";

const Quest = () => {
  const [saveState, setSaveState] = useState({});
  const [quest, setQuest] = useState({});
  const [choiceSelection, setChoiceSelection] = useState([]);
  const [choice, setChoice] = useState({});
  const [monsters, setMonsters] = useState([]);
  const [chosenMonster, setChosenMonster] = useState({});
  const [isMyTurn, setIsMyTurn] = useState(true);
  const [log, setLog] = useState(``);

  console.log(saveState);

  useEffect(() => {
    if (!saveState.character) {
      const gameData = JSON.parse(localStorage.getItem(`gameData`));
      setSaveState(gameData);
      setQuest(gameData.quests[0]);
      setMonsters(gameData.quests[0].monsters);
      setChoiceSelection(gameData.quests[0].choices);
    }
  }, []);

  // useEffect(() => {
  //   saveState.character
  //     ? setLog(log + `_You have ${saveState.character.hp} health`)
  //     : null;
  // }, []);

  useEffect(() => {
    if (choice.name) {
      if (choice.result.includes(`Damage`)) {
        setChosenMonster({
          ...chosenMonster,
          hp: chosenMonster.hp - saveState.character.atk,
        });
        setChoice({});
        setIsMyTurn(false);
      }
    }

    if (!isMyTurn) {
      setSaveState({
        ...saveState,
        character: {
          ...saveState.character,
          hp: saveState.character.hp - chosenMonster.atk,
        },
      });
      setIsMyTurn(true);
    }
  }, [isMyTurn, choice]);

  useEffect(() => {
    chosenMonster.name
      ? setLog(
          log +
            `_${chosenMonster.name} attacks!` +
            `_You now have ${saveState.character.hp} health`
        )
      : null;
  }, [saveState]);

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

      saveState.quests[0].monsters.map((monster) => {
        if (monster.name === chosenMonster.name) {
          const index = saveState.quests[0].monsters.indexOf(monster);
          saveState.quests[0].monsters.splice(index, 1);
        }
      });

      const newSaveState = { ...saveState };

      setSaveState(newSaveState);

      localStorage.setItem(`gameData`, JSON.stringify(saveState));
    }
  }, [chosenMonster]);

  const choiceClickHandler = (id) => {
    fetchChoice(id);
    console.log(choice);
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
