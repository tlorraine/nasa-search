import React, {useState, useEffect} from 'react';
import '../searchResults/SearchResults.css';
import {Link, useParams} from "react-router-dom";
import {getNasaDetailsById} from "../../api/nasa-api";
import './PictureDetails.css';

const PictureDetails = () => {
  let {nasaId} = useParams();
  const [nasaDetails, setNasaDetails] = useState(null);

  useEffect(() => {
    getNasaDetailsById(nasaId)
      .then(response => setNasaDetails(response.collection.items[0]));
  }, [nasaId]);

  if (!nasaDetails) {
    return (
      <div>Not Found...</div>
    );
  }

  return (
    <div>
      <Link className='back-link' to={'/home'}>Back</Link>
      <div className="center-content">
        <h3 className='title'>Title: {nasaDetails.data[0].title}</h3>
        <h6 className='id'>Id: {nasaDetails.data[0].nasa_id}</h6>
        <img className="nasa-img" src={nasaDetails.links[0].href}></img>
        <p className='description'>Description: {nasaDetails.data[0].description}</p>
        <p className='created'>Created: {nasaDetails.data[0].date_created}</p>
      </div>
    </div>
  );
};

export default PictureDetails;
