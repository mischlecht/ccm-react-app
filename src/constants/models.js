import * as Immutable from 'immutable';

import { InitialState as HomeInitialState } from '../home/constants/home.models';
import { InitialState as ProviderInitialState } from '../provider/constants/provider.models';

export const AppState = Immutable.Map({
    homeState: HomeInitialState,
    providerState: ProviderInitialState
});