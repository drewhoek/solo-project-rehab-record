const patientsWithoutPlansReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PATIENTS_WITHOUT_PLAN':
            return action.payload;
        case 'UNSET_PATIENTS_WITHOUT_PLAN':
            return [];
        default:
            return state;
    }
};

export default patientsWithoutPlansReducer;