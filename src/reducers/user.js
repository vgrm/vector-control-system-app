import { ACTION_TYPES } from "../actions/user";
import Cookies from 'js-cookie';

const tokenCookie = Cookies.get('token');
const valueOrNull = (value = null) => value;
const userCurrent = JSON.parse(valueOrNull(Cookies.get('userCurrent')));


const initialState = {
    list: [],
    userCurrent: userCurrent,
    isLoggedIn: userCurrent ? true : false
}

//console.log("CURRENT USER:",userCurrent);
/*
const initialState = {
    list: [],
    userCurrent: userCurrent
        ? { isLoggedIn: true, userCurrent }
        : { isLoggedIn: false, userCurrent: null }
}
*/
/*
const initialState = {
  list: [],
  cookie: tokenCookie,
  userCurrent: {},
  isLoggedIn: false
  //auth: tokenCookie ? { isLoggedIn: true, userCurrent } : { isLoggedIn: false, userCurrent: null }
}
*/

export const user = (state = initialState, action) => {

    switch (action.type) {
        case ACTION_TYPES.FETCH_ALL_USER:
            return {
                ...state,
                list: [...action.payload]
            }

        case ACTION_TYPES.SIGNUP_USER:
            return {
                ...state,
                isLoggedIn: true,
                userCurrent: action.payload
            }

        case ACTION_TYPES.SIGNIN_USER:
            return {
                ...state,
                isLoggedIn: true,
                userCurrent: action.payload
            }

        case ACTION_TYPES.SIGNOUT_USER:
            return {
                ...state,
                isLoggedIn: false,
                userCurrent: null
            }

        case ACTION_TYPES.CREATE_USER:
            return {
                ...state,
                list: [...state.list, action.payload]
            }

        case ACTION_TYPES.UPDATE_USER:
            return {
                ...state,
                list: state.list.map(x => x.id == action.payload.id ? action.payload : x)
            }

        case ACTION_TYPES.DELETE_USER:
            return {
                ...state,
                list: state.list.filter(x => x.username != action.payload)
            }

        default:
            return state
    }
}