import { createAPIEndpoint, ENDPIONTS } from './api';

export const ACTION_TYPES = {
    CREATE_PROJECTDATA: 'CREATE_PROJECTDATA',
    UPDATE_PROJECTDATA: 'UPDATE_PROJECTDATA',
    DELETE_PROJECTDATA: 'DELETE_PROJECTDATA',
    FETCH_ALL_PROJECTDATA: 'FETCH_ALL_PROJECTDATA'
}

export const fetchAll = () => dispatch => {
    createAPIEndpoint(ENDPIONTS.PROJECTDATA).fetchAll()
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL_PROJECTDATA,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}

export const create = (data, onSuccess) => dispatch => {
    //data = formateData(data)
    createAPIEndpoint(ENDPIONTS.PROJECTDATA).create(data)
        .then(res => {
            console.log(res.data);
            console.log(data);
            dispatch({
                type: ACTION_TYPES.CREATE_PROJECTDATA,
                payload: res.data
            })
            //onSuccess()
        })
        .catch(err => console.log(err))
}

export const update = (id, data, onSuccess) => dispatch => {
    //data = formateData(data)
    createAPIEndpoint(ENDPIONTS.PROJECTDATA).update(id, data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.UPDATE_PROJECTDATA,
                payload: { id, ...data }
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const Delete = (id, onSuccess) => dispatch => {
    createAPIEndpoint(ENDPIONTS.PROJECTDATA).delete(id)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.DELETE_PROJECTDATA,
                payload: id
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}