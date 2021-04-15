import { createAPIEndpoint, ENDPIONTS } from './api';

export const ACTION_TYPES = {
    CREATE_USER: 'CREATE_USER',
    UPDATE_USER: 'UPDATE_USER',
    DELETE_USER: 'DELETE_USER',
    FETCH_ALL_USER: 'FETCH_ALL_USER'
}

export const fetchAll = () => dispatch => {
    createAPIEndpoint(ENDPIONTS.USER).fetchAll()
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL_USER,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}