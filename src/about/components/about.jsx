import React from 'react';

// Since this component is simple and static, there's no parent container for it.
export default class AboutPage extends React.Component {
    render() {
        return <div className="container bg-secondary text-light">
            <div className="container-fluid text-center">
                <h2>About This App</h2>
            </div>
            
            <hr/>

            <div>
                <p>This app was built with Facebook's <b><a className="text-light" href="https://github.com/facebook/create-react-app">create-react-app</a></b> node module.</p>
            </div>
        </div>;
    }
};
