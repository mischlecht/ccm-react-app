import React, { Component } from 'react';
import { store } from '../store/store';
import ProviderPage from './components/provider-page.jsx';
import * as ProviderActions from './provider.actions';
import * as ProviderUtils from '../shared/utils/provider.utils';

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
        this.bootstrapStaticData();
    }

    render() {
        return <div className="provider-page-content">
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

    bootstrapStaticData() {
        ProviderUtils.populateSpecialties(specialties => {
            ProviderActions.SaveSpecialties(specialties);
        });
        ProviderUtils.populateFacilityTypes(facilityTypes => {
            ProviderActions.SaveFacilityTypes(facilityTypes);
        });
    }
};