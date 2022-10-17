import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import boardReducer from './boardReducer.js';
import columnReducer from './columnReducer.js';
import tileReducer from './tileReducer.js';

const logger = require("redux-logger").default;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(logger));

const rootReducer = combineReducers({
    board: boardReducer,
    columns: columnReducer,
    tiles: tileReducer
});

const configureStore = (preLoadedState) => {
    return createStore(rootReducer, preLoadedState, enhancer);
};

export default configureStore;