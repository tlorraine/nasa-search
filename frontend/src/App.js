import React from 'react';
import './App.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {Switch, Route} from "react-router-dom";
import Home from "./screens/Home";
import PictureDetails from "./components/pictureDetails/PictureDetails";
import Navbar from "./components/navbar/Navbar";
import About from "./screens/About";
import './index.css';
import Search from "./screens/Search";

function App() {
  return (
    <div>
      <Navbar/>
      <Switch>
        <Route path="/nasa-details/:nasaId">
          <PictureDetails/>
        </Route>

        <Route path="/about">
          <About/>
        </Route>

        <Route path="/search">
          <Search/>
        </Route>

        <Route path="/">
          <Home/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
