const buildVisitInformationReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_CURRENT_VISIT_INFORMATION':
            return action.payload;
        case 'UNSET_CURRENT_VISIT_INFORMATION':
            return {};
        default:
            return state;
    }
};

export default buildVisitInformationReducer;