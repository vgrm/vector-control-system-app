import { createAPIEndpoint, ENDPIONTS } from './api';

export const ACTION_TYPES = {
    CREATE_ARC: 'CREATE_ARC',
    UPDATE_ARC: 'UPDATE_ARC',
    PATCH_ARC: 'PATCH_ARC',
    DELETE_ARC: 'DELETE_ARC',
    FETCH_ALL_ARC: 'FETCH_ALL_ARC',
    FETCH_ARC: 'FETCH_ARC',
    FETCH_ARCS_MATCH: 'FETCH_ARCS_MATCH',
    FETCH_ARCS_INCORRECT: 'FETCH_ARCS_INCORRECT',
    FETCH_ARCS_MISSING: 'FETCH_ARCS_MISSING',
    FETCH_ARCS_HANDLE: 'FETCH_ARCS_HANDLE'
}

export const fetchAll = () => dispatch => {
    createAPIEndpoint(ENDPIONTS.ARC).fetchAll()
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL_ARC,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}

export const fetchArcsMatch = (id) => dispatch => {
    console.log("trying to fetch matching Arcs project id " + id);
    createAPIEndpoint(ENDPIONTS.ARC + "/ArcsMatch").fetchAllParams(id)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_ARCS_MATCH,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}

export const fetchArcsIncorrect = (id) => dispatch => {
    console.log("trying to fetch incorrect Arcs project id " + id);
    createAPIEndpoint(ENDPIONTS.ARC + "/ArcsIncorrect").fetchAllParams(id)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_ARCS_INCORRECT,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}

export const fetchArcsMissing = (id) => dispatch => {
    console.log("trying to fetch missing Arcs project id " + id);
    createAPIEndpoint(ENDPIONTS.ARC + "/ArcsMissing").fetchAllParams(id)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_ARCS_MISSING,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}

export const fetchArcsHandle = (id) => dispatch => {
    console.log("trying to fetch Handle Arcs project id " + id);
    createAPIEndpoint(ENDPIONTS.ARC + "/ArcsHandle").fetchAllParams(id)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_ARCS_HANDLE,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}

export const fetchById = (id) => dispatch => {
    console.log("trying to fetch single project of id:"+id);
    createAPIEndpoint(ENDPIONTS.ARC).fetchById(id)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_ARC,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}

export const create = (data, onSuccess) => dispatch => {
    //data = formateData(data)
    createAPIEndpoint(ENDPIONTS.ARC).create(data)
        .then(res => {
            console.log(res.data);
            console.log(data);
            dispatch({
                type: ACTION_TYPES.CREATE_ARC,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const update = (id, data, onSuccess) => dispatch => {
    console.log(data);
    createAPIEndpoint(ENDPIONTS.ARC).update(id, data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.UPDATE_ARC,
                payload: { id, ...data }
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const patch = (id, data, onSuccess) => dispatch => {
    console.log("trying to patch data");
    console.log(data);
    createAPIEndpoint(ENDPIONTS.ARC).patch(id, data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.PATCH_ARC,
                payload: { id, ...data }
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const Delete = (id, onSuccess) => dispatch => {
    createAPIEndpoint(ENDPIONTS.ARC).delete(id)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.DELETE_ARC,
                payload: id
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}