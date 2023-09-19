import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Quest = () => {
  const [quest, setQuest] = useState({});
  const [choiceSelection, setChoiceSelection] = useState([]);
  const [choice, setChoice] = useState({});
  const [monsters, setMonsters] = useState([]);
  const [chosenMonster, setChosenMonster] = useState({});
  const [log, setLog] = useState(``);
  const { id } = useParams();

  console.log(chosenMonster);
  useEffect(() => {
    !quest.name ? fetchQuest(id) : null;
    chosenMonster.name
      ? setLog(log + `_${chosenMonster.name} has ${chosenMonster.hp} health`)
      : null;
  }, [chosenMonster]);

  const fetchQuest = async (id) => {
    try {
      const response = await fetch(`/api/quests/${id}`);
      const data = await response.json();

      setQuest(data);
      setMonsters(data.monsters);
      setChoiceSelection(data.choices);
    } catch (error) {
      console.log(error);
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
      setChosenMonster((chosenMonster.hp -= 10));
    } catch (error) {
      console.log(error);
    }
  };

  const selectHandler = (event) => {
    setChosenMonster(JSON.parse(event.target.value));
  };

  return (
    <>
      <h1>Quest: {quest.name}</h1>
      <p>{quest.description}</p>
      <section>
        <p>What would you like to do?</p>
        {choiceSelection
          ? choiceSelection.map((choice) => (
              <button
                key={choice.id}
                onClick={() => choiceClickHandler(choice.id)}
              >
                {choice.name}
              </button>
            ))
          : null}
        <br />
        <select onChange={selectHandler}>
          {!chosenMonster.name ? <option>Select Monster</option> : null}
          {monsters.map((monster) => (
            <option key={monster.id} value={JSON.stringify(monster)}>
              {monster.name}
            </option>
          ))}
        </select>
      </section>
      <section>
        {log.split(`_`).map((singleLog, index) => (
          <p key={index}>{singleLog}</p>
        ))}
      </section>
    </>
  );
};

export default Quest;
