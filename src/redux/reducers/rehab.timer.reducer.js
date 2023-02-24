const rehabTimerReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_TIME_AND_DATE':
            return action.payload;
        case 'UNSET_TIME_AND_DATE':
            return {};
        default:
            return state;
    }
};

export default rehabTimerReducer;