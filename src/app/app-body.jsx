import React, { Component } from 'react';
import '../styles/app.css';
import { 
  Route
} from 'react-router-dom'
/* pages */
import ProviderController from '../provider/provider.controller';
import AboutPage from '../about/components/about';

export default class AppBody extends Component {
  render() {
    return (
      <div className="app-body">
        <Route exact path="/" component={ProviderController}/>
        <Route path="/about" component={AboutPage}/>
      </div>
    );
  }
}
