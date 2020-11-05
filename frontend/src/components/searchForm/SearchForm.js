import React, { useState } from 'react';
import SearchResults from "../searchResults/SearchResults";
import {getNasaImages, getNasaImagesByPage} from "../../api/nasa-api";
import Loader from "react-loader-spinner";
import './SearchForm.css';

const queryString = require('query-string');

const SearchForm = () => {
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [nasaCollection, setNasaCollection] = useState(null);
  const [totalHits, setTotalHits] = useState(0);
  const [loading, setLoading] = useState(false);

  const onQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const search = (event, page) => {
    event.preventDefault();
    setLoading(true);
    getNasaImagesByPage(query, page)
      .then((response) => {
        setNasaCollection(response);
        const href = response.collection.href;
        if (href) {
          const queryResult = queryString.parse(href);
          if (queryResult.page) {
            setCurrentPage(Number(queryResult.page));
          }
        }
        const totalPageNumbers = response.collection.metadata.total_hits;
        if (totalPageNumbers) {
          setTotalHits(Number(totalPageNumbers));
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const renderSearchResults = () => {
    if (loading) {
      return (
        <Loader
          className="spinner"
          type="Oval"
          color="#4c3b71"
          height={100}
          width={100}
          timeout={5000}
        />
      );
    }
    if (nasaCollection && totalHits > 0) {
      return (
        <SearchResults
          totalHits={totalHits}
          nasaCollection={nasaCollection}
          currentPage={currentPage}
          search={search}
        />
      );
    }
    if (nasaCollection === null) {
      return (
        <div></div>
      );
    }
    return (
      <div>No Search Results Found...</div>
    );
  };

  return (
    <div>
      <div className='search-div'>
        <form  className='search-form' onSubmit={(event) => search(event, 1)}>
          <input className='search-input' placeholder='Search for moon, supernova or anything else space related.' type="text" value={query} onChange={onQueryChange}/>
          <button className='search-button' type='onSubmit'>Search</button>
        </form>
      </div>
      {renderSearchResults()}
    </div>
  );
};

export default SearchForm;
