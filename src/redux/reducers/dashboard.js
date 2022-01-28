const initialState = {};

const dashboard = (state = initialState, action) => {
    const {type, payload} = action;
    switch(type) {
        case 'FETCH_AREAS':
            return {
                ...state,
                areas: payload
            }
        default:
            return state;
    }
}

export default dashboard;