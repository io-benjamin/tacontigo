import React from "react";
import HomePage from "./HomePage";
import Dropdown from "./Dropdown";
import './App.css';


function App(){
  return(
    <div>
    <header className="app">
      <div className="header-title">
        <h1>TACONTIGO</h1>
      </div>
      <div className="header-toggle">
      <Dropdown />
      </div>
    </header>
    <main>
      <HomePage />
    </main>
  </div>
  );
}

export default App;