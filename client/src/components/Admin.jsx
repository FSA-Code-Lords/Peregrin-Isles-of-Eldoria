import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {

    const [users, setUsers] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [changesHappened, setChangesHappened] = useState(false);
  
    const navigate = useNavigate();
  
    const token = localStorage.getItem(`token`);
    
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
  
    // const banUser = async (id) => {
    //     try {
    //       await fetch(`/api/users/${id}`, {
    //         method: `PUT`,
    //         headers: {
    //           "Content-Type": `application/json`,
    //           Authorization: `Bearer ${token}`,
    //         },
            
    //       });
    
    //       setChangesHappened(!changesHappened);
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   };

    const clickHandler = (id) => {
      navigate(`/profile/${id}`);
    };
  
    const deleteHandler = (id) => {
      deleteUser(id);
    };

    // const banHandler = (id) => {
    //     banUser(id);
    // };
  
    return (
        <div className='formstyle'>
        <div className='form-container'>
      <section id="userPage" className="flex">
        <h1>Admin</h1>
        <h2>All Users</h2>
        {isAdmin ? (
          users.map((user) => (
            <section key={user.id}>
              <section>
                <h3>{user.username}</h3>
                <p>Admin: {String(user.isAdmin)}</p>
                <p>Banned: {String(user.isBanned)}</p>
                <p><b>Save Files</b></p>
                <p><i>Save files will go here.</i></p>
                <button onClick={() => deleteHandler(user.id)}>
                  Delete User
                </button>
                <br></br>
                <button onClick={() => banHandler(user.id)}>
                  Ban User
                </button>
                <br></br>
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