import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

// Create a store using redux store functions. reducers is a map of reducers names to their
// corresponding functions. middlewares is an array of middlewares to use. We can possibly
// add storeEnhancers here in the future if needed.
export default function configureStore(initialState = {}, rootReducer, middlewares = []) {
  const middlewareList = [thunk, ...middlewares];

  if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
    const logger = createLogger();
    middlewareList.push(logger);
  }

  const enhancer = compose(
    applyMiddleware(...middlewareList),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f,
  );

  const store = createStore(rootReducer, initialState, enhancer);

  return store;
}
