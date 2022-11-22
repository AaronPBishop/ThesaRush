const initialState = { order: 0 };

export const incrementOrder = () => {
    return {
        type: 'INCREMENT_ORDER'
    };
};

export const resetOrder = () => {
    return {
        type: 'RESET_ORDER'
    };
};

const orderReducer = (state = initialState, action) => {
    let currentState = { ...state };

    switch (action.type) {
        case 'INCREMENT_ORDER': {
            currentState.order += 1;

            return currentState;
        };

        case 'RESET_ORDER': {
            return initialState;
        };

        default: return currentState;
    };
};

export default orderReducer;