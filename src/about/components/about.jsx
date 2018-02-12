import React, { Component } from 'react';
import PageTitle from '../../shared/components/page-title';
import '../../styles/about.css';

// Since this component is simple and static, there's no parent container for it.
export default class AboutPage extends Component {
    render() {
        return <div className="about-page-content">
            <PageTitle title="About This App" />

            <div className="about-container">
                <p>The purpose of this app was to test my skills surrounding React and showcase how powerful it can be when paired with the modern miracle that is the Unidirectional dataflow.</p>
                <p>This application includes the following features:</p>
                <ul>
                    <li>React+Redux</li>
                    <li>Bootstrap Styling Framework</li>
                    <li>Functional Programming</li>
                    <li>Utilization of Meta Data</li>
                    <li>An easter egg, the likes which have never been seen...</li>
                </ul>
                <p>I hope you have as much fun testing this app and trying to break it as I did conjuring it up for you all!</p>
                <br/>

                <p>God Bless,</p>
                <p>Michael Schlecht</p>
                <br/>
                <br/>
                <br/>
                <small>This app was built with Facebook's <b><a href="https://github.com/facebook/create-react-app">create-react-app</a></b> tool.</small>
            </div>
        </div>;
    }
};
