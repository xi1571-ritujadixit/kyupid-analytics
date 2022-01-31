import axios from "axios";
import { apiUrl } from "../../environment";

export const fetchAreas = () => {
    return async (dispatch) => {
        const url = `${apiUrl}/areas`;
        const response = await axios.get(url);
        return dispatch({
            type: "FETCH_AREAS",
            payload: response.data,
        });
    };
};

export const fetchUsers = () => {
    return async (dispatch) => {
        const url = `${apiUrl}/users`;
        const response = await axios.get(url);
        return dispatch({
            type: "FETCH_USERS",
            payload: response.data,
        });
    };
};

export const fetchAreaToUserMapping = () => {
    return async (dispatch, getState) => {
        const { dashboard } = getState();
        const { areas, users } = dashboard;
        const areaToUsersMapping = {};
        let totalProUsers = 0;
        for (let i = 0; i < areas.features.length; i++) {
            areaToUsersMapping[areas.features[i].properties.area_id] = [];
        }
        for (let i = 0; i < users.length; i++) {
            areaToUsersMapping[users[i].area_id].push(users[i]);
            users[i].is_pro_user && totalProUsers++;
        }
        return dispatch({
            type: "FETCH_AREA_TO_USER_MAPPING",
            payload: { areaToUsersMapping, totalProUsers },
        });
    };
};
