import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className='navbar'>
      <Link to={'/'}>
        <span className='home'>Home</span>
      </Link>
      <Link to={'/list'}>
        <span className='list'>List</span>
      </Link>
    </div>
  );
};

export default Navbar;
