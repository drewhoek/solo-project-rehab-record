const muscleWorkToBeDoneReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_MUSCLE_WORK_TO_BE_DONE':
            return action.payload;
        case 'UNSET_MUSCLE_WORK_TO_BE_DONE':
            return [];
        default:
            return state;
    }
};

export default muscleWorkToBeDoneReducer;