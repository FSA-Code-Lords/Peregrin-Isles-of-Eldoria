import React, { useState } from 'react';

const NewGame = () => {
  const [formData, setFormData] = useState({
    name: '',
    race: '',
    class: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <h2>Create a New User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Race:</label>
          <select
            name="race"
            value={formData.race}
            onChange={handleInputChange}
          >
            <option value="elf">Elf</option>
            <option value="dwarf">Dwarf</option>
            <option value="boolian">Boolian</option>
          </select>
        </div>
        <div>
          <label>Class:</label>
          <select
            name="class"
            value={formData.class}
            onChange={handleInputChange}
          >
            <option value="warrior">Warrior</option>
            <option value="mage">Mage</option>
          </select>
        </div>
        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default NewGame;
