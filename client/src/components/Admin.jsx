import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [changesHappened, setChangesHappened] = useState(false);
  const [saveData, setsaveData] = useState([]);

  const navigate = useNavigate();

  const token = localStorage.getItem(`token`);

  // checkIfAdmin useEffect
  useEffect(() => {
    if (localStorage.getItem(`token`)) {
      const tokenArr = localStorage.getItem(`token`).split(`.`);
      const { id } = JSON.parse(atob(tokenArr[1]));

      checkIfAdmin(id);
      fetchUsers();
    }
  }, [changesHappened]);

  const checkIfAdmin = async (id) => {
    try {
      const response = await fetch(`/api/users/${id}`);
      const result = await response.json();
      setIsAdmin(result.isAdmin);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(`/api/users`);
      const result = await response.json();

      result.sort((user1, user2) => {
        if (user1.username < user2.username) {
          return -1;
        } else if (user1.username > user2.username) {
          return 1;
        } else {
          return 0;
        }
      });

      setUsers(result);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await fetch(`/api/users/${id}`, {
        method: `DELETE`,
        headers: {
          "Content-Type": `application/json`,
          Authorization: `Bearer ${token}`,
        },
      });

      setChangesHappened(!changesHappened);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteGame = async (id) => {
    try {
      await fetch(`/api/saveData/${id}`, {
        method: `DELETE`,
        headers: {
          "Content-Type": `application/json`,
          Authorization: `Bearer ${token}`,
        },
      });
      setChangesHappened(!changesHappened);
    } catch (error) {
      console.log(error);
    }
  };

  // saveData useEffect
  useEffect(() => {
    const tokenArr = localStorage.getItem(`token`).split(`.`);
    const { id } = JSON.parse(atob(tokenArr[1]));
    fetch(`/api/saveData/${id}`)
      .then((response) => response.json())
      .then((dataArray) => {
        const parseDataArray = dataArray.map((data) => {
          const saveVariable = JSON.parse(data.serializedData);
          saveVariable.id = data.id;
          saveVariable.userId = data.userId;
          return saveVariable;
        });
        setsaveData(parseDataArray);
      })
      .catch((error) => {
        console.error("Error fetching saved games:", error);
      });
  }, [changesHappened]);

  // Other stuff

  // const clickHandler = (id) => {
  //   navigate(`/profile/${id}`);
  // };

  const deleteHandler = (id) => {
    deleteUser(id);
  };

  const deleteGameHandler = (id) => {
    deleteGame(id);
  };

  const handleMainMenuClick = () => {
    navigate("/");
  };

  return (
    <div className="formstyle">
      <div className="form-container">
        <section id="userPage" className="flex">
          <h1>Admin</h1>
          <button onClick={handleMainMenuClick}>Return to Main Menu</button>
        </section>
        <section id="userPage" className="flex">
          <h2>All Users</h2>
          {isAdmin ? (
            users.map((user) => (
              <section key={user.id}>
                <section>
                  <h3>{user.username}</h3>
                  <p>Admin: {String(user.isAdmin)}</p>
                  <p>
                    <b>Save Files</b>
                  </p>
                  <p>{}</p>
                  <button onClick={() => deleteHandler(user.id)}>
                    Delete User
                  </button>
                  <br></br>
                  <br></br>
                  <p></p>
                </section>
              </section>
            ))
          ) : (
            <p>You do not have Access</p>
          )}
        </section>
        <section id="userPage" className="flex">
          <h2>All Games</h2>
          {isAdmin ? (
            saveData.map((saveData) => (
              <section key={saveData.id}>
                <section>
                  <h4>{saveData.character.name} (User #{saveData.userId})</h4>               
                  <p>Race: {saveData.character.race}</p>
                  <p>Class: {saveData.character.class}</p>
                  <button onClick={() => deleteGameHandler(saveData.id)}>
                    Delete Game
                  </button>
                </section>
              </section>
            ))
          ) : (
            <p>You do not have Access</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default Admin;
