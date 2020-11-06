import React, {useEffect, useState} from 'react';
import SearchResults from "../searchResults/SearchResults";
import {getNasaImages, getNasaImagesByPage} from "../../api/nasa-api";
import Loader from "react-loader-spinner";
import './SearchForm.css';
import {useHistory, useRouteMatch} from "react-router";
import {useQuery} from "../../hooks/query-hook";

const queryString = require('query-string');

const SearchForm = () => {
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [nasaCollection, setNasaCollection] = useState(null);
  const [totalHits, setTotalHits] = useState(0);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const queryHistory = useQuery();
  const onCurrentRouteMatch = useRouteMatch('/search');

  useEffect(() => {
    if (onCurrentRouteMatch) {
      const q = queryHistory.get('q');
      const page = queryHistory.get('page');
      if (q && page) {
        setQuery(q);
        executeSearch(q, page);
      }
    }
  }, []);

  const onQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const executeSearch = (q, page) => {
    setLoading(true);
    getNasaImagesByPage(q, page)
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
        history.push(`/search?q=${q}&page=${page}`);
      });
  };

  const search = (event, page) => {
    event.preventDefault();
    executeSearch(query, page);
  };

  const renderSearchResults = () => {
    if (loading) {
      return (
        <Loader
          className="spinner"
          type="Oval"
          color="#6C63FF"
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
        <form className='search-form' onSubmit={(event) => search(event, 1)}>
          <input className='search-input' placeholder='Search for moon, supernova...'
                 type="text" value={query} onChange={onQueryChange}/>
          <button className='search-button' type='onSubmit'>Search</button>
        </form>
      </div>
      {renderSearchResults()}
    </div>
  );
};

export default SearchForm;
