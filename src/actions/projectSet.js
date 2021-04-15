import { createAPIEndpoint, ENDPIONTS } from './api';

export const ACTION_TYPES = {
    CREATE_PROJECTSET: 'CREATE_PROJECTSET',
    UPDATE_PROJECTSET: 'UPDATE_PROJECTSET',
    DELETE_PROJECTSET: 'DELETE_PROJECTSET',
    FETCH_ALL_PROJECTSET: 'FETCH_ALL_PROJECTSET'
}

export const fetchAll = () => dispatch => {
    createAPIEndpoint(ENDPIONTS.PROJECTSET).fetchAll()
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL_PROJECTSET,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}