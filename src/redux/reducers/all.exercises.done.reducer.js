const allExercisesDoneReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ALL_EXERCISES_DONE':
            return [...state, action.payload];
        case 'UNSET_ALL_EXERCISES_DONE':
            return [];
        default:
            return state;
    }
};

export default allExercisesDoneReducer;