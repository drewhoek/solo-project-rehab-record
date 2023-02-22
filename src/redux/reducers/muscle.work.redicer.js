const muscleWorkReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_MUSCLE_WORK':
            return action.payload;
        case 'UNSET_MUSCLE_WORK':
            return [];
        default:
            return state;
    }
};

export default muscleWorkReducer;