import { createAPIEndpoint, ENDPIONTS } from './api';

export const ACTION_TYPES = {
    CREATE_PROJECTDATA: 'CREATE_PROJECTDATA',
    UPDATE_PROJECTDATA: 'UPDATE_PROJECTDATA',
    PATCH_PROJECTDATA: 'PATCH_PROJECTDATA',
    DELETE_PROJECTDATA: 'DELETE_PROJECTDATA',
    FETCH_ALL_PROJECTDATA: 'FETCH_ALL_PROJECTDATA',
    FETCH_PROJECTDATA: 'FETCH_PROJECTDATA',
    FETCH_PROJECTDATA_USER: 'FETCH_PROJECTDATA_USER',
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

export const fetchProjects = (id) => dispatch => {
    createAPIEndpoint(ENDPIONTS.PROJECTDATA).fetchProjects(id)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL_PROJECTDATA,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}


export const fetchById = (id) => dispatch => {
    createAPIEndpoint(ENDPIONTS.PROJECTDATA).fetchById(id)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_PROJECTDATA,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}

export const fetchByUser = (id) => dispatch => {
    createAPIEndpoint(ENDPIONTS.PROJECTDATA + "/user").fetchAllParams(id)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_PROJECTDATA_USER,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}

export const create = (data, onSuccess) => dispatch => {
    createAPIEndpoint(ENDPIONTS.PROJECTDATA).create(data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.CREATE_PROJECTDATA,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const update = (id, data, onSuccess, onError) => dispatch => {
    createAPIEndpoint(ENDPIONTS.PROJECTDATA).update(id, data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.UPDATE_PROJECTDATA,
                payload: { id, ...data }
            })
            onSuccess()
        })
        .catch(err => onError())
    //.catch(err => console.log(err))
}

export const patch = (id, data, onSuccess) => dispatch => {
    createAPIEndpoint(ENDPIONTS.PROJECTDATA).patch(id, data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.PATCH_PROJECTDATA,
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