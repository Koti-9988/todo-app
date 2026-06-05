import React, { useState } from "react";

function App() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);

  // Create & Update
  const handleSubmit = () => {
    if (!name.trim()) return;

    if (editId) {
      // Update
      setEmployees(
        
        employees.map((employee) => employee.id === editId ? { ...employee, name } : employee)

      );
      setEditId(null);
    } else {
      // Create
      const newEmployee = {
        id: Date.now(),
        name,
      };

      setEmployees([...employees, newEmployee]);
    }

    setName("");

  };

  // Edit
  const handleEdit = (employee) => {
    setName(employee.name);
    setEditId(employee.id);
  };

  // Delete
  const handleDelete = (id) => {
    setEmployees(
      employees.filter(
        (employee) => employee.id !== id
      )
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Employee App</h2>

      <input
        type="text"
        placeholder="Enter Employee Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={handleSubmit}>
        {editId ? "Update" : "Add"}
      </button>

      <table
        border="1"
        cellPadding="10"
        style={{ marginTop: "20px" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan="3" style={{backgroundColor:"green",color:"white"}}> No Employees Found </td>
            </tr>
          ) : (
            employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>
                  <button
                    onClick={() => handleEdit(employee)}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(employee.id)
                    }
                    style={{ marginLeft: "10px",backgroundColor:"red",color:"white",border:"0px" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
