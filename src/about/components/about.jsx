import React from 'react';

// Since this component is simple and static, there's no parent container for it.
export default class AboutPage extends React.Component {
    render() {
        return <div class="container bg-secondary text-light">
            <h2>About This App</h2>
            <p>This app was built with Facebook's <b><a class="text-light" href="https://github.com/facebook/create-react-app">create-react-app</a></b> node module.</p>
        </div>;
    }
};
