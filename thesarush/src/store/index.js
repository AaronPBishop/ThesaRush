import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import gameReducer from './gameReducer.js';
import statsReducer from './statsReducer';

const logger = require("redux-logger").default;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(logger));

const rootReducer = combineReducers({
    game: gameReducer,
    stats: statsReducer
});

const configureStore = (preLoadedState) => {
    return createStore(rootReducer, preLoadedState, enhancer);
};

export default configureStore;