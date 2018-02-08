import * as Projections from '../../store/projections';

export function setProviderResults (previous, action) {
    const { providerResults } = action;

    let newState = previous;

    newState = newState.setIn(['providerState', 'providerResults'], Projections.projectProviderResultsToObject(providerResults));

    return newState;
}