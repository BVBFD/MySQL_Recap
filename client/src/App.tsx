import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';

type EmployeeType = {
  id?: number;
  name: string;
  age: number;
  country: string;
  position: string;
  wage: number;
  taskName?: string;
  hour?: number;
};

function App() {
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<number>(0);
  const [country, setCountry] = useState<string>('');
  const [position, setPosition] = useState<string>('');
  const [wage, setWage] = useState<number>(0);

  const [newWage, setNewWage] = useState<number>(0);

  const [employeeList, setEmployeeList] = useState<EmployeeType[]>([]);

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
        <Link to={'/list'}>
          <button>Show Employees</button>
        </Link>
      </div>
    </div>
  );
}

export type { EmployeeType };
export default App;
