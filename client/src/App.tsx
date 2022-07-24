import React, { useState } from 'react';
import './App.css';
import { Link, useNavigate } from 'react-router-dom';
import axiosRepuest from './config';
import { genRandomId } from './randomId';

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
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await axiosRepuest.post('/employees/create', {
        id: genRandomId(),
        name,
        age,
        country,
        position,
        wage,
      });

      navigate(`/list`);
    } catch (error) {
      window.alert(error);
    }
  };

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
        <button
          onClick={
            name && age && country && position && wage ? handleSubmit : () => {}
          }
        >
          Add Employee
        </button>
        <Link to={'/list'}>
          <button>Show Employees</button>
        </Link>
      </div>
    </div>
  );
}

export type { EmployeeType };
export default App;
