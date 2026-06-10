import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [search, setSearch] = useState("")
  const [users, setUsers] = useState([
    { id: 1, name: "koti", age: 25 },
    { id: 2, name: "venkat", age: 35 }
  ]);

  const filteredData = users.filter((user) =>
    user.name.includes(search.toLowerCase())
  )

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    age: ""
  });

  function editUser(user) {
    setFormData(user);
    setIsEditing(true);
  }


  function handleChange(e) {

    setFormData({
      ...formData,
      [e.target.name]: [e.target.value]
    });



  }




  function addUser(e) {

    e.preventDefault();

    const newUser = {


      id: users.length + 1,

      name: formData.name,
      age: formData.age
    };

    // setUsers([...users, newUser]);
    setUsers([...users, newUser]);

    setFormData({
      name: "",
      age: ""
    });

  }


  function updateUser(e) {
    e.preventDefault();

    const updatedUsers = users.map((user) =>
      user.id === formData.id ? formData : user
    );

    setUsers(updatedUsers);

    setFormData({
      id: null,
      name: "",
      age: ""
    });

    setIsEditing(false);

  }


 const deleteUser = (id) => {
  setUsers((users) =>
    users.filter((user) => user.id !== id)
  );
};




  return (
    <>
      <div>


        <p>Total Users : {users.length}</p>

        <h2>{isEditing ? "Update User" : "Add User"}</h2>

        <form onSubmit={isEditing ? updateUser : addUser} >

          <div >

            <input name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Enter Your Name" />

          </div>
          <div >

            <input name="age" type="number" value={formData.age} onChange={handleChange} placeholder="Enter Your Age" />

          </div>


          <div>
            <button type="submit"> {isEditing ? "Update User" : "Add User"}</button>
          </div>


        </form>
{/* 
        <div>
          <input type="text" placeholder="Search username..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div> */}

        <table border="1">
          <tr>
            <th>id</th>
            <th>name</th>
            <th>age</th>
            <th colSpan={2}>action</th>
          </tr>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td><button onClick={() => editUser(user)}>
                Edit
              </button></td>
              <td>
                <button onClick={() => deleteUser(user.id)}>
                  Delete
                </button>
              </td>
            </tr>

          ))


          }

        </table>

      </div>

    </>

  );
}

export default App;