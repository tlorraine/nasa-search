import React, {useEffect, useState} from 'react';
import './Navbar.css';
import {Link} from "react-router-dom";
import {useHistory, useRouteMatch} from "react-router";

const Navbar = () => {
  const routeMatch = useRouteMatch('/nasa-details');
  const [match, setMatch] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (routeMatch) {
      setMatch(true);
    } else {
      setMatch(false);
    }
  }, [routeMatch, match]);

  return (
    <ul className='nav'>
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
