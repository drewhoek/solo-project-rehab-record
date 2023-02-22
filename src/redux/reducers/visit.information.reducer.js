const visitInformationReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_PREVIOUS_VISIT_INFORMATION':
            return action.payload;
        case 'UNSET_PREVIOUS_VISIT_INFORMATION':
            return {};
        default:
            return state;
    }
};

export default visitInformationReducer;