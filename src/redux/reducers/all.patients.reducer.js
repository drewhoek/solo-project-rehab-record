const allPatientsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ALL_PATIENTS':
            return action.payload;
        case 'UNSET_ALL_PATIENTS':
            return [];
        default:
            return state;
    }
};

export default allPatientsReducer;