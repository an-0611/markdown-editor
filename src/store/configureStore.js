import {
  createStore,
  // applyMiddleware,
  compose,
} from 'redux'

import reducers from '../reducers';

export default function configureStore(client, history, initialState) {
  const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(
      // applyMiddleware(client.middleware()),
    ),
  );

  return store;
}