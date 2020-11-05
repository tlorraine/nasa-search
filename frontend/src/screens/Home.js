import React from 'react';
import SearchForm from "../components/searchForm/SearchForm";
import astronaut from './astronaut.svg'

const Home = () => {

  return (
    <div className="App">
      <h1 className='main-header'>Explore the universe</h1>
      <SearchForm />
      {/*<img src={astronaut}/>*/}
    </div>
  );

};

export default Home;
