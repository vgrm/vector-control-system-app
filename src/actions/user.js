import { createAPIEndpoint, ENDPIONTS } from './api';
import Cookies from 'js-cookie';

export const ACTION_TYPES = {
    CREATE_USER: 'CREATE_USER',
    UPDATE_USER: 'UPDATE_USER',
    DELETE_USER: 'DELETE_USER',
    FETCH_ALL_USER: 'FETCH_ALL_USER',
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

export const fetchById = (id) => dispatch => {
    console.log("trying to fetch single project of id:"+id);
    createAPIEndpoint(ENDPIONTS.PROJECTDATA).fetchById(id)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_PROJECTDATA,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}

export const signup = (data, onSuccess) => dispatch => {
    //data = formateData(data)
    createAPIEndpoint(ENDPIONTS.USER + "/signup").create(data)
        .then(res => {
            //console.log("resdata",res.data);
            //console.log(data);
            dispatch({
                type: ACTION_TYPES.SIGNUP_USER,
                payload: res.data
            })
            onSuccess();
            //localStorage.setItem('myData', res.data.token);
            //Cookies.set('token',res.data.token);
            Cookies.set('userCurrent',res.data);
        })
        .catch(err => console.log(err))
}

export const signin = (data, onSuccess) => dispatch => {
    //data = formateData(data)
    createAPIEndpoint(ENDPIONTS.USER + '/signin').create(data)
        .then(res => {
            console.log(res.data);
            //console.log(data);
            dispatch({
                type: ACTION_TYPES.SIGNIN_USER,
                payload: res.data
            })
            onSuccess()
            //Cookies.set('token',res.data.token);
            Cookies.set('userCurrent',res.data);
        })
        .catch(err => console.log(err))
}

export const signout = () => dispatch => {
    //Cookies.set('userCurrent',res.data);
    Cookies.remove('userCurrent');
    dispatch({
        type: ACTION_TYPES.SIGNOUT_USER
      });
}

export const update = (id, data, onSuccess) => dispatch => {
    //data = formateData(data)
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
