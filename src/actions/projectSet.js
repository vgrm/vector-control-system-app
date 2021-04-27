import { createAPIEndpoint, ENDPIONTS } from './api';

export const ACTION_TYPES = {
    CREATE_PROJECTSET: 'CREATE_PROJECTSET',
    UPDATE_PROJECTSET: 'UPDATE_PROJECTSET',
    DELETE_PROJECTSET: 'DELETE_PROJECTSET',
    FETCH_ALL_PROJECTSET: 'FETCH_ALL_PROJECTSET',
    FETCH_PROJECTSET: 'FETCH_PROJECTSET',
    FETCH_ALL_PROJECTSET_OWNED: 'FETCH_ALL_PROJECTSET_OWNED',
    FETCH_ALL_PROJECTSET_OTHER: 'FETCH_ALL_PROJECTSET_OTHER',
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

export const fetchAllOwned = () => dispatch => {
    createAPIEndpoint(ENDPIONTS.PROJECTSET + "/owned").fetchAll()
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL_PROJECTSET_OWNED,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}

export const fetchAllOther = () => dispatch => {
    createAPIEndpoint(ENDPIONTS.PROJECTSET + "/other").fetchAll()
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL_PROJECTSET_OTHER,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}

export const fetchById = (id) => dispatch => {
    console.log("trying to fetch single set");
    createAPIEndpoint(ENDPIONTS.PROJECTSET).fetchById(id)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_PROJECTSET,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}
export const create = (data, onSuccess) => dispatch => {
    //data = formateData(data)
    console.log("create set");
    createAPIEndpoint(ENDPIONTS.PROJECTSET).create(data)
        .then(res => {
            console.log(res.data);
            console.log(data);
            dispatch({
                type: ACTION_TYPES.CREATE_PROJECTSET,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const update = (id, data, onSuccess) => dispatch => {
    //data = formateData(data)
    createAPIEndpoint(ENDPIONTS.PROJECTSET).update(id, data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.UPDATE_PROJECTSET,
                payload: { id, ...data }
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const Delete = (id, onSuccess) => dispatch => {
    createAPIEndpoint(ENDPIONTS.PROJECTSET).delete(id)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.DELETE_PROJECTSET,
                payload: id
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}