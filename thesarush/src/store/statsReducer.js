const initialState = { 
    invalidWords: 0,
    points: 0, 
    score: 0, 
    words: 0,
    longestWord: '',
    tilesCleared: 0,
    difficulty: undefined
};

export const incrementInvalidWords = () => {
    return {
        type: 'INCREMENT_INVALID_WORDS'
    };
};

export const determinePoints = (points, letters) => {
    return {
        type: 'DETERMINE_POINTS',
        payload: points,
        payload2: letters
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

export const setDifficulty = (difficulty) => {
    return {
        type: 'SET_DIFFICULTY',
        payload: difficulty
    };
};

export const resetStats = () => {
    return {
        type: 'RESET_STATS'
    };
};

const statsReducer = (state = initialState, action) => {
    const currentState = { ...state };

    switch (action.type) {
        case 'INCREMENT_INVALID_WORDS': {
            if (currentState.invalidWords > 1) {
                currentState.invalidWords = 0;

                return currentState;
            };

            currentState.invalidWords += 1;

            return currentState;
        };

        case 'DETERMINE_POINTS': {
            const scoreMultipliers = ['X', 'Z', 'Q'];
            let multiplier = 0;

            const pointsMap = {5: 7, 6: 9, 7: 11, 8: 16, 9: 20};

            action.payload2.split('').forEach(letter => {if (scoreMultipliers.includes(letter)) multiplier += 1});

            if (action.payload < 5) {
                currentState.points += action.payload;
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

            if (multiplier > 0) {
                currentState.points += action.payload *= multiplier;
                currentState.score += action.payload *= multiplier;
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

        case 'SET_DIFFICULTY': {
            currentState.difficulty = action.payload;

            return currentState;
        };

        case 'RESET_STATS': {
            for (let key in currentState) {
                if (key !== 'difficulty') currentState[key] = initialState[key];
            };

            return currentState;
        };

        default: return currentState;
    };
};

export default statsReducer;