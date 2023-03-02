const exerciseVariationsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_EXERCISE_VARIATIONS':
            return action.payload;
        case 'UNSET_EXERCISES_VARIATIONS':
            return [];
        default:
            return state;
    }
};

export default exerciseVariationsReducer;