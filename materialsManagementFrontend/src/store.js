import {
  createStore,
  compose as origCompose,
  applyMiddleware,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import { lazyReducerEnhancer } from "pwa-helpers/lazy-reducer-enhancer.js";

import materialsReducer from "./reducers/reducers.js";

const compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || origCompose;

export const store = createStore(
  (state, action) => state, // eslint-disable-line no-unused-vars
  compose(lazyReducerEnhancer(combineReducers), applyMiddleware(thunk))
);

store.addReducers({
  materialsReducer,
});
