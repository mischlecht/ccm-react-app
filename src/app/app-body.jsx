import React, { Component } from 'react';
import '../styles/app.css';
import { 
  Route
} from 'react-router-dom'
/* pages */
import HomeController from '../home/home.controller';
import AboutPage from '../about/components/about';

export default class AppBody extends Component {
  render() {
    return (
      <div className="container app-body bg-secondary">
        <Route exact path="/" component={HomeController}/>
        <Route path="/about" component={AboutPage}/>
      </div>
    );
  }
}
