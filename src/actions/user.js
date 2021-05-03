import { createAPIEndpoint, ENDPIONTS } from './api';
import Cookies from 'js-cookie';

export const ACTION_TYPES = {
    CREATE_USER: 'CREATE_USER',
    UPDATE_USER: 'UPDATE_USER',
    DELETE_USER: 'DELETE_USER',
    FETCH_ALL_USER: 'FETCH_ALL_USER',
    FETCH_USER: 'FETCH_USER',
    SIGNIN_USER: 'SIGNIN_USER',
    SIGNUP_USER: 'SIGNUP_USER',
    SIGNOUT_USER: 'SIGNOUT_USER'
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

export const fetchByUsername = (username) => dispatch => {
    createAPIEndpoint(ENDPIONTS.USER).fetchByUsername(username)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_USER,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}

export const signup = (data, onSuccess) => dispatch => {
    createAPIEndpoint(ENDPIONTS.USER + "/signup").create(data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.SIGNUP_USER,
                payload: res.data
            })
            onSuccess();
            Cookies.set('userCurrent', res.data);
        })
        .catch(err => console.log(err))
}

export const signin = (data, onSuccess) => dispatch => {
    createAPIEndpoint(ENDPIONTS.USER + '/signin').create(data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.SIGNIN_USER,
                payload: res.data
            })
            onSuccess()
            Cookies.set('userCurrent', res.data);
        })
        .catch(err => console.log(err))
}

export const signout = () => dispatch => {
    Cookies.remove('userCurrent');
    dispatch({
        type: ACTION_TYPES.SIGNOUT_USER
    });
}

export const update = (id, data, onSuccess) => dispatch => {
    createAPIEndpoint(ENDPIONTS.USER).update(id, data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.UPDATE_USER,
                payload: { id, ...data }
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const Delete = (id, onSuccess) => dispatch => {
    createAPIEndpoint(ENDPIONTS.USER).delete(id)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.DELETE_USER,
                payload: id
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}
