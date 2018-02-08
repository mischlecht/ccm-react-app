import React, { Component } from 'react';

import { store } from '../store/store';
import ProviderPage from './components/provider-page.jsx';

export default class ProviderController extends Component {
    constructor(props){
        super(props);
        
        this.getProviderStateFromStore = this.getProviderStateFromStore.bind(this);
        this.onStoreChange = this.onStoreChange.bind(this);
        
        this.state = this.getProviderStateFromStore();
    }

    componentWillMount(){
        this.setState({ providerState: this.getProviderStateFromStore() });
    }

    componentDidMount(){
        store.subscribe(this.onStoreChange);
    }

    render() {
        return <div>
            <ProviderPage
                providerState={ this.state.providerState } />
        </div>;
    }

    getProviderStateFromStore(){
        const storeState = store.getState();
        return storeState.get('providerState');
    }

    onStoreChange() {
        const newState = this.getProviderStateFromStore();
        this.setState({ providerState: newState });
    }
};