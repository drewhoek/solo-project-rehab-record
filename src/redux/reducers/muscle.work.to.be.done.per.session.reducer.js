const muscleWorkToBeDonePerSessionReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_MUSCLE_WORK_TO_BE_DONE_PER_SESSION':
            return action.payload;
        case 'UNSET_MUSCLE_WORK_TO_BE_DONE_PER_SESSION':
            return [];
        default:
            return state;
    }
};

export default muscleWorkToBeDonePerSessionReducer;