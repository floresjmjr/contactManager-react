import React from 'react';
import {BrowserRouter} from 'react-router-dom';

import './App.css';

import Header from './Components/Header/Header'
import Content from './Components/Content/Content';

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
        <Content/>
      </div>
    </BrowserRouter>
  );
}

export default App;
