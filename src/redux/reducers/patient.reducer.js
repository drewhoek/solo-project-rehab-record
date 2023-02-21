const patientReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PATIENTS_WITH_PLAN':
            return action.payload;
        case 'UNSET_PATIENTS_WITH_PLAN':
            return [];
        default:
            return state;
    }
};

export default patientReducer;