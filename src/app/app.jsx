import React, { Component } from 'react';
import '../styles/app.css';
import { 
  BrowserRouter as Router,
} from 'react-router-dom'
/* pages */
import Navbar from '../shared/components/navbar';
import AppBody from './app-body';

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Router>
          <div>
            <Navbar/>
            <br/>
            <AppBody/>
          </div>
        </Router>
      </div>
    );
  }
}