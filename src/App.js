import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
// import SiteRouter from './components/Covid/Router_covid';
import Router_covid from './components/Covid/components/Router_covid';
// import AskQuestions from './components/AskQuestions/AskQuestions'
class App extends Component {
  render(){
    return(
      <div className="app">
        <Router>
          <Router_covid />
        </Router>
      </div>
    );
  }
}

export default App;