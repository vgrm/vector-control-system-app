import { ACTION_TYPES } from "../actions/arc";

const initialState = {
    list: [],
    listMatch: [],
    listIncorrect: [],
    listMissing: [],
    listHandle: []
}

export const arc = (state = initialState, action) => {

    switch (action.type) {

        case ACTION_TYPES.FETCH_ARCS_MATCH:
            return {
                ...state,
                listMatch: [...action.payload]
            }

        case ACTION_TYPES.FETCH_ARCS_INCORRECT:
            return {
                ...state,
                listIncorrect: [...action.payload]
            }
        case ACTION_TYPES.FETCH_ARCS_MISSING:
            return {
                ...state,
                listMissing: [...action.payload]
            }
        case ACTION_TYPES.FETCH_ARCS_HANDLE:
            return {
                ...state,
                listHandle: [...action.payload]
            }
        case ACTION_TYPES.FETCH_ARC:
            return {
                ...state,
                list: state.list.map(x => x.id === action.payload.id ? action.payload : x)
            }

        default:
            return state
    }
}