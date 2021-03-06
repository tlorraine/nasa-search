import React from 'react';
import SearchForm from "../components/searchForm/SearchForm";
import logo from "../space.svg";

const Home = () => {

  return (
    <div className="App">
      <h1 className='main-header'>Explore the universe</h1>
      <SearchForm />
      <div className='img-div'>
        <img className='space-img' src={logo} />
      </div>
    </div>
  );

};

export default Home;
