import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import characterImage from "../images/Warrior.png";

const NewGame = () => {
  const [saveDataId, setSaveDataId] = useState(null);
  const [saveData, setSaveData] = useState({});

  const baseStats = { hp: 40, atk: 10, dodge: 30 };
  const [characterName, setCharacterName] = useState(``);
  const defaultCharacterClass = {
    hpChange: 0,
    atkChange: 0,
    dodgeChange: 0,
  };
  const defaultCharacterRace = {
    hpChange: 0,
    atkChange: 0,
    dodgeChange: 0,
  };
  const [characterClass, setCharacterClass] = useState(defaultCharacterClass);
  const [characterRace, setCharacterRace] = useState(defaultCharacterRace);

  const navigate = useNavigate();

  const token = localStorage.getItem(`token`);
  const tokenArr = token.split(`.`);
  const userId = JSON.parse(atob(tokenArr[1])).id;

  const newGame = {
    saveDataId: undefined,
    character: {
      name: characterName,
      race: characterRace.name,
      class: characterClass.name,
      maxHp: baseStats.hp + characterClass.hpChange + characterRace.hpChange,
      hp: baseStats.hp + characterClass.hpChange + characterRace.hpChange,
      atk: baseStats.atk + characterClass.atkChange + characterRace.atkChange,
      dodge:
        baseStats.dodge +
        characterClass.dodgeChange +
        characterRace.dodgeChange,
      currentLocation: "",
    },
    map: [],
    inventory: [],
    quests: [],
    completedQuests: [],
  };

  useEffect(() => {
    fetchLocations();
  }, [characterClass, characterName, characterRace]);

  useEffect(() => {
    if (saveDataId) {
      console.log(saveData);
      localStorage.setItem(`gameData`, JSON.stringify(saveData));
      saveGame(saveDataId, JSON.stringify(saveData));
      navigate(`/Game`);
    }
  }, [saveDataId]);

  const saveGame = async (saveDataId, gameData) => {
    try {
      const response = await fetch(`/api/saveData/${saveDataId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          serializedData: gameData,
        }),
      });

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    initialSaveGame(JSON.stringify(newGame));
    event.target.reset();
    setCharacterClass({
      hpChange: 0,
      atkChange: 0,
      dodgeChange: 0,
    });
    setCharacterRace({
      hpChange: 0,
      atkChange: 0,
      dodgeChange: 0,
    });
  };

  const initialSaveGame = async (gameData) => {
    try {
      const response = await fetch(`/api/saveData`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          serializedData: gameData,
          userId,
        }),
      });

      const result = await response.json();
      console.log(result);
      setSaveData({ ...newGame, saveDataId: result.saveData.id });
      setSaveDataId(result.saveData.id);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRace = async (id) => {
    if (id === "Choose Race") {
      setCharacterRace({
        hpChange: 0,
        atkChange: 0,
        dodgeChange: 0,
      });
    } else {
      try {
        const response = await fetch(`/api/races/${id}`);
        const result = await response.json();
        setCharacterRace(result);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fetchClass = async (id) => {
    if (id === "Choose Class") {
      setCharacterClass({
        hpChange: 0,
        atkChange: 0,
        dodgeChange: 0,
      });
    } else {
      try {
        const response = await fetch(`/api/classes/${id}`);
        const result = await response.json();
        setCharacterClass(result);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fetchLocations = async () => {
    try {
      const response = await fetch(`/api/locations/`);
      const result = await response.json();

      newGame.map = result;
      result.forEach((location) => {
        if (location.quests.length > 0) {
          for (let i = 0; i < location.quests.length; i++) {
            newGame.quests.push(location.quests[i]);
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [selectedRace, setSelectedRace] = useState("0");
  const [selectedClass, setSelectedClass] = useState("0");

  const handleClick = (alt) => {
    const [raceId, classId] = alt
      .split(", ")
      .map((value) => parseInt(value, 10));
    setSelectedRace(raceId);
    setSelectedClass(classId);
  };

  useEffect(() => {
    if (selectedRace !== "0") {
      fetchRace(selectedRace);
    }
    if (selectedClass !== "0") {
      fetchClass(selectedClass);
    }
  }, [selectedRace, selectedClass]);

  return (
    <div className="formstyle">
      <div className="form-container">
        <h2>Create a New Character</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              onChange={(event) => setCharacterName(event.target.value)}
              required
            />
          </div>
          <div>
            <label>Race:</label>
            <select
              name="race"
              onChange={(event) => fetchRace(event.target.value)}
              value={selectedRace.toString()}
            >
              <option>Choose Race</option>
              <option value="1">Human</option>
              <option value="2">Elf</option>
              <option value="3">Orc</option>
            </select>
          </div>
          <div>
            <label>Class:</label>
            <select
              name="class"
              onChange={(event) => fetchClass(event.target.value)}
              value={selectedClass.toString()}
            >
              <option>Choose Class</option>
              <option value="1">Warrior</option>
              <option value="2">Assassin</option>
              <option value="3">Mage</option>
              <option value="4">Knight</option>
            </select>
          </div>
          <button type="submit">Create Character & Start Game</button>
        </form>
        {characterRace.name ? (
          <section>
            <p>Name: {characterRace.name}</p>
            <p>Description: {characterRace.description}</p>
            <p>HP Change: {characterRace.hpChange}</p>
            <p>ATK Change: {characterRace.atkChange}</p>
            <p>Dodge Change: {characterRace.dodgeChange}</p>
          </section>
        ) : null}
        {characterClass.name ? (
          <section>
            <p>Name: {characterClass.name}</p>
            <p>Description: {characterClass.description}</p>
            <p>HP Change: {characterClass.hpChange}</p>
            <p>ATK Change: {characterClass.atkChange}</p>
            <p>Dodge Change: {characterClass.dodgeChange}</p>
          </section>
        ) : null}
        <div>
          <img
            src={characterImage}
            alt="Classes and Races"
            id="characterImage"
            useMap="#characterMap"
          />
          <map name="characterMap">
            <area
              shape="rect"
              coords="82, 75, 242, 235"
              alt="Human, Warrior"
              onClick={() => handleClick("1, 1")}
            />
            <area
              shape="rect"
              coords="242, 75, 402, 235"
              alt="Human, Assassin"
              onClick={() => handleClick("1, 2")}
            />
            <area
              shape="rect"
              coords="402, 75, 562, 235"
              alt="Human, Mage"
              onClick={() => handleClick("1, 3")}
            />
            <area
              shape="rect"
              coords="562, 75, 722, 235"
              alt="Human, Knight"
              onClick={() => handleClick("1, 4")}
            />
            <area
              shape="rect"
              coords="82, 225, 242, 385"
              alt="Orc, Warrior"
              onClick={() => handleClick("3, 1")}
            />
            <area
              shape="rect"
              coords="242, 225, 402, 385"
              alt="Orc, Assassin"
              onClick={() => handleClick("3, 2")}
            />
            <area
              shape="rect"
              coords="402, 225, 562, 385"
              alt="Orc, Mage"
              onClick={() => handleClick("3, 3")}
            />
            <area
              shape="rect"
              coords="562, 225, 722, 385"
              alt="Orc, Knight"
              onClick={() => handleClick("3, 4")}
            />
            <area
              shape="rect"
              coords="82, 375, 242, 535"
              alt="Elf, Warrior"
              onClick={() => handleClick("2, 1")}
            />
            <area
              shape="rect"
              coords="242, 375, 402, 535"
              alt="Elf, Assassin"
              onClick={() => handleClick("2, 2")}
            />
            <area
              shape="rect"
              coords="402, 375, 562, 535"
              alt="Elf, Mage"
              onClick={() => handleClick("2, 3")}
            />
            <area
              shape="rect"
              coords="562, 375, 722, 535"
              alt="Elf, Knight"
              onClick={() => handleClick("2, 4")}
            />
          </map>
        </div>
      </div>
    </div>
  );
};

export default NewGame;
