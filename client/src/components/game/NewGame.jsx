import React, { useEffect, useState } from "react";

const NewGame = () => {
  const [newCharacterData, setNewCharacterData] = useState({
    name: "",
    race: "",
    class: "",
    hp: 10,
    atk: 5,
    dodge: 5,
  });
  const [chosenRaceData, setChosenRaceData] = useState({})
  const [chosenClassData, setChosenClassData] = useState({})


  const [newGameData, setNewGameData] = useState({
    character: newCharacterData,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewCharacterData({ ...newCharacterData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchRace(newCharacterData.race);
    event.target.reset();
  };

  const fetchRace = async (id) => {
    try {
      const response = await fetch(`/api/races/${id}`);
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Create a New Character</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Race:</label>
          <select name="race" onChange={handleInputChange}>
            <option>Choose Race</option>
            <option value="1">Human</option>
            <option value="2">Elf</option>
            <option value="3">Orc</option>
          </select>
        </div>
        <div>
          <label>Class:</label>
          <select name="class" onChange={handleInputChange}>
            <option>Choose Class</option>
            <option value="1">Warrior</option>
            <option value="2">Assassin</option>
            <option value="3">Mage</option>
            <option value="4">Knight</option>
          </select>
        </div>
        <button type="submit">Create Character</button>
      </form>
    </div>
  );
};

export default NewGame;
