import React, {useEffect, useState} from 'react';
import './Navbar.css';
import {Link} from "react-router-dom";
import {useHistory, useRouteMatch} from "react-router";
import logo from "../../space.svg";

const Navbar = () => {
  const routeMatch = useRouteMatch('/nasa-details');
  const homeMatch = useRouteMatch('/')
  const [match, setMatch] = useState(false);
  const [homeScreenMatch, setHomeScreenMatch] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (routeMatch) {
      setMatch(true);
    } else {
      setMatch(false);
    }
  }, [routeMatch, match]);

  useEffect(() => {
    if (homeMatch) {
      setHomeScreenMatch(true);
    } else {
      setHomeScreenMatch(false);
    }
  }, [homeMatch, homeScreenMatch])

  return (
    <ul className='nav'>
      {homeScreenMatch && (
        <span className='img-div'>
        <img className='space-img' src={logo} />
      </span>
      )}
      <li>
        <Link to={'/home'}>Home</Link>
      </li>
      <li>
        <Link to={'/about'}>About</Link>
      </li>
      {match && (
        <li className='back'>
          <a onClick={(e) => {
            history.goBack();
          }}>Previous</a>
        </li>
      )}
    </ul>
  );
};

export default Navbar;
