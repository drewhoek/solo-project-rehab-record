const exercisesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_EXERCISES':
            return action.payload;
        case 'UNSET_EXERCISES':
            return [];
        default:
            return state;
    }
};

export default exercisesReducer;