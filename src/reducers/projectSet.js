import { ACTION_TYPES } from "../actions/projectSet";

const initialState = {
    list: [],
    selectedSet: {}
}

export const projectSet = (state = initialState, action) => {

    switch (action.type) {
        case ACTION_TYPES.FETCH_ALL_PROJECTSET:
            return {
                ...state,
                list: [...action.payload]
            }

            case ACTION_TYPES.FETCH_PROJECTSET:
            return {
                ...state,
                selectedSet: action.payload
            }

        case ACTION_TYPES.CREATE_PROJECTSET:
            return {
                ...state,
                list: [...state.list, action.payload]
            }

        case ACTION_TYPES.UPDATE_PROJECTSET:
            return {
                ...state,
                list: state.list.map(x => x.id == action.payload.id ? action.payload : x)
            }

        case ACTION_TYPES.DELETE_PROJECTSET:
            return {
                ...state,
                list: state.list.filter(x => x.id != action.payload)
            }
            
        default:
            return state
    }
}