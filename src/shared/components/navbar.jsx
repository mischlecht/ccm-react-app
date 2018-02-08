import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/navbar.css';

export default class Navbar extends Component {
  render() {
    return (
        <div id="navbar-main">
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <a class="navbar-brand text-white" href="/">CCM React App</a>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <Link class="nav-link text-white" to="/">Home</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link text-white" to="/about">About</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
  }
}
