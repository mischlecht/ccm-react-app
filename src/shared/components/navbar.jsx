import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/navbar.css';

export default class Navbar extends Component {
  render() {
    return (
        <div id="navbar-main">
            <nav className="navbar navbar-expand-lg navbar-dark bg-info app-navbar">
                <a className="navbar-brand text-white" href="/">CCM React App</a>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/">Provider</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/about">About</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
  }
}
