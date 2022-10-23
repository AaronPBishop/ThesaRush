const initialState = { 
    points: 0, 
    score: 0, 
    words: 0,
    longestWord: '',
    tilesCleared: 0
};

export const incrementPoints = (points) => {
    return {
        type: 'INCREMENT_POINTS',
        payload: points
    };
};

export const resetPoints = () => {
    return {
        type: 'RESET_POINTS'
    };
};

export const incrementWords = () => {
    return {
        type: 'INCREMENT_WORDS'
    };
};

export const setLongestWord = (word) => {
    return {
        type: 'SET_LONGEST_WORD',
        payload: word
    };
};

const statsReducer = (state = initialState, action) => {
    const currentState = { ...state };

    switch (action.type) {
        case 'INCREMENT_POINTS': {
            const pointsMap = {5: 7, 6: 9, 7: 11, 8: 16, 9: 20}

            if (action.payload < 5) {
                currentState.points += action.payload
                currentState.score += action.payload;
            };

            if (action.payload > 4) {
                currentState.points += pointsMap[action.payload];
                currentState.score += pointsMap[action.payload];
            };

            if (action.payload > 9) {
                currentState.points += (action.payload * 3);
                currentState.score += (action.payload * 3);
            };

            currentState.tilesCleared += action.payload;

            return currentState;
        };

        case 'RESET_POINTS': {
            currentState.points = 0;

            return currentState;
        };

        case 'INCREMENT_WORDS': {
            currentState.words += 1;

            return currentState;
        };

        case 'SET_LONGEST_WORD': {
            if (action.payload.length > currentState.longestWord.length) currentState.longestWord = action.payload;

            return currentState;
        };

        default: return currentState;
    };
};

export default statsReducer;