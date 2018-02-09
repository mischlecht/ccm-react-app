import React, { Component } from 'react';

// Since this component is simple and static, there's no parent container for it.
export default class AboutPage extends Component {
    render() {
        return <div className="container">
            <div className="container-fluid text-center">
                <h2>About This App</h2>
            </div>
            
            <hr/>

            <div className="container-fluid text-center">
                <p>This app was built with Facebook's <b><a href="https://github.com/facebook/create-react-app">create-react-app</a></b> node module.</p>
            </div>
        </div>;
    }
};
