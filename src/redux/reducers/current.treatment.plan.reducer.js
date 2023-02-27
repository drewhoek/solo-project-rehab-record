const allCurrentTreatmentPlansReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_CURRENT_PLAN':
            return action.payload;
        case 'UNSET_CURRENT_PLAN':
            return {};
        default:
            return state;
    }
};

export default allCurrentTreatmentPlansReducer;