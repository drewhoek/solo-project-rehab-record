const patientInfoReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_PATIENT_INFO':
            return action.payload;
        default:
            return state;
    }
};

export default patientInfoReducer;