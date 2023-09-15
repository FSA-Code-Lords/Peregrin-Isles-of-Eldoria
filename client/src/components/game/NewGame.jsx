import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NewGame = () => {
  const navigate = useNavigate();
  const baseStats = { hp: 20, atk: 10, dodge: 10 };
  const [characterName, setCharacterName] = useState(``);
  const [characterClass, setCharacterClass] = useState({
    hpChange: 0,
    atkChange: 0,
    dodgeChange: 0,
  });
  const [characterRace, setCharacterRace] = useState({
    hpChange: 0,
    atkChange: 0,
    dodgeChange: 0,
  });

  const token = localStorage.getItem(`token`);
  const tokenArr = token.split(`.`);
  const userId = JSON.parse(atob(tokenArr[1])).id;

  const newGame = {
    character: {
      name: characterName,
      race: characterRace.name,
      class: characterClass.name,
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
    fetchFirstLocation();
  }, [characterClass, characterRace, characterName]);

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem(`gameData`, JSON.stringify(newGame));
    saveGame(JSON.stringify(newGame));
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
    navigate(`/loadGame`);
  };

  const saveGame = async (gameData) => {
    try {
      const response = await fetch(`/api/SaveData`, {
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

  const fetchFirstLocation = async () => {
    try {
      const response = await fetch(`/api/locations/1`);
      const result = await response.json();
      newGame.map.push(result);
      newGame.quests = result.quests;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ background: "white"}}>
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
          >
            <option>Choose Class</option>
            <option value="1">Warrior</option>
            <option value="2">Assassin</option>
            <option value="3">Mage</option>
            <option value="4">Knight</option>
          </select>
        </div>
        <button type="submit">Create Character</button>
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
    </div>
  );
};

export default NewGame;
