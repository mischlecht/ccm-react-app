import * as Immutable from 'immutable';

import { InitialState as HomeInitialState } from '../home/constants/home.models';

export const AppState = Immutable.Map({
    homeState: HomeInitialState
});