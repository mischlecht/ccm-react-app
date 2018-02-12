import * as Immutable from 'immutable';

import { InitialState as ProviderInitialState } from '../provider/constants/provider.models';

export const AppState = Immutable.Map({
    providerState: ProviderInitialState
});