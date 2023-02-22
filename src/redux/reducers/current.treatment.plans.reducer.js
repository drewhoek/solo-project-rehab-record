const currentTreatmentPlanReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ACTIVE_TREATMENT_PLANS':
            return action.payload;
        case 'UNSET_ACTIVE_TREATMENT_PLANS':
            return [];
        default:
            return state;
    }
};

export default currentTreatmentPlanReducer;