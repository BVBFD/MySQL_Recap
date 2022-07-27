import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import List from './list/List';
import EmployeesInfo from './employeesInfo/EmployeesInfo';
import Navbar from './navbar/Navbar';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Navbar />
              <App />
            </>
          }
        />
        <Route
          path='/list'
          element={
            <>
              <Navbar />
              <List />
            </>
          }
        />
        <Route
          path='/employees/:id'
          element={
            <>
              <Navbar />
              <EmployeesInfo />
            </>
          }
        />
      </Routes>
    </Router>
  </React.StrictMode>
);
