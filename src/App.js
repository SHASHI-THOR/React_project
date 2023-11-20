// src/App.js
import React, { useState } from 'react';
import './App.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement login logic here (e.g., send data to a server)
    // For simplicity, let's consider the user is logged in successfully for any non-empty username and password
    if (username.trim() !== '' && password.trim() !== '') {
      onLogin();
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
      </label>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

const Dashboard = ({ employees }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <h2>Employee List</h2>
      <input
        type="text"
        placeholder="Search by employee name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredEmployees.map((employee) => (
        <div key={employee.id} className="employee-card">
          <p>{employee.name}</p>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Mock employee data
  const employees = [
    { id: 1, name: 'John Doe', details: 'Details about John Doe' },
    { id: 2, name: 'Jane Smith', details: 'Details about Jane Smith' },
    // Add more employees as needed
  ];

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleEmployeeDetailsClose = () => {
    setSelectedEmployee(null);
  };

  return (
    <div className="app-container">
      {loggedIn ? (
        <div>
          <Dashboard employees={employees} onEmployeeClick={handleEmployeeClick} />
          {selectedEmployee && (
            <EmployeeDetails employee={selectedEmployee} onClose={handleEmployeeDetailsClose} />
          )}
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
