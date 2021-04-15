import { ACTION_TYPES } from "../actions/projectData";

const initialState = {
    list: []
}

export const projectData = (state = initialState, action) => {

    switch (action.type) {
        case ACTION_TYPES.FETCH_ALL_PROJECTDATA:
            return {
                ...state,
                list: [...action.payload]
            }

        case ACTION_TYPES.CREATE_PROJECTDATA:
            return {
                ...state,
                list: [...state.list, action.payload]
            }

        case ACTION_TYPES.UPDATE_PROJECTDATA:
            return {
                ...state,
                list: state.list.map(x => x.id == action.payload.id ? action.payload : x)
            }

        case ACTION_TYPES.DELETE_PROJECTDATA:
            return {
                ...state,
                list: state.list.filter(x => x.id != action.payload)
            }
            
        default:
            return state
    }
}