import React, {useState} from 'react';
import './Navbar.css';
import {Link} from "react-router-dom";

const Navbar = () => {

  return (
    <ul className='nav'>
      <li>
        <Link to={'/home'}>Home</Link>
      </li>
      <li>
        <Link to={'/about'}>About</Link>
      </li>
    </ul>
  );
};

export default Navbar;
