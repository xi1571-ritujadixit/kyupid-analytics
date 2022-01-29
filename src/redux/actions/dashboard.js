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
