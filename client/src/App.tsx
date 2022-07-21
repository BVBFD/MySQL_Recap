import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

type Employee = {
  name: string;
  age: number;
  country: string;
  position: string;
  wage: number;
};

function App() {
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<number>(0);
  const [country, setCountry] = useState<string>('');
  const [position, setPosition] = useState<string>('');
  const [wage, setWage] = useState<number>(0);

  const [newWage, setNewWage] = useState<number>(0);

  const [employeeList, setEmployeeList] = useState<Employee[]>([]);

  return (
    <div className='App'>
      <div className='information'>
        <label>Name:</label>
        <input type='text' onChange={(e) => setName(e.target.value)} />
        <label>Age:</label>
        <input
          type='number'
          onChange={(e) => setAge(e.target.value as unknown as number)}
        />
        <label>Country:</label>
        <input type='text' onChange={(e) => setCountry(e.target.value)} />
        <label>Position:</label>
        <input type='text' onChange={(e) => setPosition(e.target.value)} />
        <label>Wage (year):</label>
        <input
          type='number'
          onChange={(e) => setWage(e.target.value as unknown as number)}
        />
        <button>Add Employee</button>
      </div>
      <div className='employees'>
        <button>Show Employees</button>

        {employeeList.map((val, key) => {
          return (
            <div className='employee'>
              <div>
                <h3>Name: {val.name}</h3>
                <h3>Age: {val.age}</h3>
                <h3>Country: {val.country}</h3>
                <h3>Position: {val.position}</h3>
                <h3>Wage: {val.wage}</h3>
              </div>
              <div>
                <input type='text' placeholder='2000...' />
                <button>Update</button>

                <button>Delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
