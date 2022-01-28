import axios from 'axios';

export const fetchAreas = () => {
    return async(dispatch) => {
        const url = 'https://kyupid-api.vercel.app/api/areas';
        const response = await axios.get(url);
        return dispatch({
            type: 'FETCH_AREAS',
            payload: response.data
        })
    }
}