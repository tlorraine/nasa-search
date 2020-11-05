import React from 'react';
import './SearchResults.css';
import {Link} from "react-router-dom";
import Pagination from "../pagination/Pagination";

const SearchResults = (props) => {
  const {nasaCollection, search, totalHits, currentPage} = props;

  const renderListItems = () => {
    return nasaCollection.collection.items.map((item) => {
      return (
        <Link to={`/nasa-details/${item.data[0].nasa_id}`}>
          <div className="nasa-collection-list-item">
            {item.links && item.links
              .filter((link) => link.render && link.render === 'image')
              .map((link) => {
                return (
                  <img
                    className="nasa-img"
                    src={link.href}/>
                );
              })
            }
          </div>
        </Link>
      );
    });
  };

  if (!nasaCollection) {
    return (
      <div>
      </div>
    );
  }

  return (
    <div>
      <div className="nasa-total-hits">Total Hits: {totalHits}</div>
      <div className="nasa-collection-list">
        {renderListItems()}
      </div>
      <Pagination nasaCollection={nasaCollection} search={search} totalHits={totalHits} currentPage={currentPage}/>
    </div>
  );
};

export default SearchResults;
