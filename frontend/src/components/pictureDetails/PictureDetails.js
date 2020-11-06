import React, {useState, useEffect} from 'react';
import './PictureDetails.css';
import '../searchResults/SearchResults.css';
import {useParams} from "react-router-dom";
import {getNasaDetailsById} from "../../api/nasa-api";

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
    <div className='details'>
      <div className="center-content">
        <h3 className='title'>Title: {nasaDetails.data[0].title}</h3>
        <img className="nasa-img" src={nasaDetails.links[0].href}/>
        <p className='description'>Description: {nasaDetails.data[0].description}</p>
        <p className='created'>Created: {nasaDetails.data[0].date_created}</p>
      </div>
    </div>
  );
};

export default PictureDetails;
