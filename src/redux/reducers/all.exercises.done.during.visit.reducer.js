const allExercisesDoneDuringVisitReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ALL_EXERCISES_DONE_DURING_VISIT':
            return [...state, action.payload];
        case 'UNSET_ALL_EXERCISES_DONE_DURING_VISIT':
            return [];
        default:
            return state;
    }
};

export default allExercisesDoneDuringVisitReducer;