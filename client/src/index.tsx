import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import List from './list/List';
import EmployeesInfo from './employeesInfo/EmployeesInfo';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/list' element={<List />} />
        <Route path='employees/:id' element={<EmployeesInfo />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
