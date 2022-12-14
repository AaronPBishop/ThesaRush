import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from "redux-thunk";

import gameReducer from './game.js';
import menuReducer from './menu.js';
import userReducer from './user.js';
import offerStatusesReducer from './offerStatuses.js';
import leagueReducer from './league.js';
import challengeReducer from './challenge.js';

const rootReducer = combineReducers({
    game: gameReducer,
    menu: menuReducer,
    user: userReducer,
    offerStatuses: offerStatusesReducer,
    league: leagueReducer,
    challenge: challengeReducer
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
};

const configureStore = (preLoadedState) => {
    return createStore(rootReducer, preLoadedState, enhancer);
};

export default configureStore;