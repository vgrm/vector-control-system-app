import { createAPIEndpoint, ENDPIONTS } from './api';

export const ACTION_TYPES = {
    CREATE_LINE: 'CREATE_LINE',
    UPDATE_LINE: 'UPDATE_LINE',
    PATCH_LINE: 'PATCH_LINE',
    DELETE_LINE: 'DELETE_LINE',
    FETCH_ALL_LINE: 'FETCH_ALL_LINE',
    FETCH_LINE: 'FETCH_LINE',
    FETCH_LINES_MATCH: 'FETCH_LINES_MATCH',
    FETCH_LINES_INCORRECT: 'FETCH_LINES_INCORRECT',
    FETCH_LINES_MISSING: 'FETCH_LINES_MISSING',
    FETCH_LINES_HANDLE: 'FETCH_LINES_HANDLE'
}

export const fetchAll = () => dispatch => {
    createAPIEndpoint(ENDPIONTS.LINE).fetchAll()
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL_LINE,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}

export const fetchLinesMatch = (id) => dispatch => {
    console.log("trying to fetch matching lines project id " + id);
    createAPIEndpoint(ENDPIONTS.LINE + "/LinesMatch").fetchAllParams(id)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_LINES_MATCH,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}

export const fetchLinesIncorrect = (id) => dispatch => {
    console.log("trying to fetch incorrect lines project id " + id);
    createAPIEndpoint(ENDPIONTS.LINE + "/LinesIncorrect").fetchAllParams(id)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_LINES_INCORRECT,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}

export const fetchLinesMissing = (id) => dispatch => {
    console.log("trying to fetch missing lines project id " + id);
    createAPIEndpoint(ENDPIONTS.LINE + "/LinesMissing").fetchAllParams(id)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_LINES_MISSING,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}

export const fetchLinesHandle = (id) => dispatch => {
    console.log("trying to fetch Handle lines project id " + id);
    createAPIEndpoint(ENDPIONTS.LINE + "/LinesHandle").fetchAllParams(id)
        .then(response => {
            console.log(response);
            dispatch({
                type: ACTION_TYPES.FETCH_LINES_HANDLE,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}

export const fetchById = (id) => dispatch => {
    console.log("trying to fetch single project of id:"+id);
    createAPIEndpoint(ENDPIONTS.LINE).fetchById(id)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_LINE,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}

export const create = (data, onSuccess) => dispatch => {
    //data = formateData(data)
    createAPIEndpoint(ENDPIONTS.LINE).create(data)
        .then(res => {
            console.log(res.data);
            console.log(data);
            dispatch({
                type: ACTION_TYPES.CREATE_LINE,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const update = (id, data, onSuccess) => dispatch => {
    console.log(data);
    createAPIEndpoint(ENDPIONTS.LINE).update(id, data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.UPDATE_LINE,
                payload: { id, ...data }
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const patch = (id, data, onSuccess) => dispatch => {
    console.log("trying to patch data");
    console.log(data);
    createAPIEndpoint(ENDPIONTS.LINE).patch(id, data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.PATCH_LINE,
                payload: { id, ...data }
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const Delete = (id, onSuccess) => dispatch => {
    createAPIEndpoint(ENDPIONTS.LINE).delete(id)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.DELETE_LINE,
                payload: id
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}