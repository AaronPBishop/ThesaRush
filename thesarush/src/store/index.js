import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import boardReducer from './boardReducer.js';
import tilesReducer from './tilesReducer.js';

const logger = require("redux-logger").default;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(logger));

const rootReducer = combineReducers({
    board: boardReducer,
    tiles: tilesReducer
});

const configureStore = (preLoadedState) => {
    return createStore(rootReducer, preLoadedState, enhancer);
};

export default configureStore;