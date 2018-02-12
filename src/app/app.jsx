import React, { Component } from 'react';
import '../styles/app.css';
import { 
  BrowserRouter as Router,
} from 'react-router-dom'
/* pages */
import Navbar from '../shared/components/navbar';
import AppBody from './app-body';
import Konami from 'react-konami';
import If from '../shared/components/if';
import EasterEgg from '../shared/shhh/easter-egg';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state ={
            showEasterEgg: false
        };

        this.revealEasterEgg = this.revealEasterEgg.bind(this);
        this.hideEasterEgg = this.hideEasterEgg.bind(this);
    }

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
                <Konami
                    easterEgg={this.revealEasterEgg} />
                <If condition={this.state.showEasterEgg} >
                    <EasterEgg
                        hideEasterEgg={this.hideEasterEgg} />
                </If>
            </div>
        );
    }

    revealEasterEgg() {
        this.setState({showEasterEgg: true});
    }

    hideEasterEgg() {
        this.setState({showEasterEgg: false});
    }
}