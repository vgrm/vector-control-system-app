import { ACTION_TYPES } from "../actions/user";

const initialState = {
    list: []
}

export const user = (state = initialState, action) => {

    switch (action.type) {
        case ACTION_TYPES.FETCH_ALL_USER:
            return {
                ...state,
                list: [...action.payload]
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
                list: state.list.filter(x => x.id != action.payload)
            }
            
        default:
            return state
    }
}