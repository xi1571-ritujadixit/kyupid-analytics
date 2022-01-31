const initialState = {};

const dashboard = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case "FETCH_AREAS":
            return {
                ...state,
                areas: payload,
            };
        case "FETCH_USERS":
            return {
                ...state,
                users: payload.users,
            };
        case "FETCH_AREA_TO_USER_MAPPING":
            return {
                ...state,
                areaToUsersMapping: payload.areaToUsersMapping,
                totalProUsers: payload.totalProUsers,
            };
        default:
            return state;
    }
};

export default dashboard;
