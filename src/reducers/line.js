import { ACTION_TYPES } from "../actions/line";

const initialState = {
    list: [],
    listMatch: [],
    listIncorrect: [],
    listMissing: [],
    listHandle: []
}

export const line = (state = initialState, action) => {

    switch (action.type) {

        case ACTION_TYPES.FETCH_LINES_MATCH:
            return {
                ...state,
                listMatch: [...action.payload]
            }

        case ACTION_TYPES.FETCH_LINES_INCORRECT:
            return {
                ...state,
                listIncorrect: [...action.payload]
            }
        case ACTION_TYPES.FETCH_LINES_MISSING:
            return {
                ...state,
                listMissing: [...action.payload]
            }

        case ACTION_TYPES.FETCH_LINES_HANDLE:
            return {
                ...state,
                listHandle: [...action.payload]
            }

        case ACTION_TYPES.FETCH_LINE:
            return {
                ...state,
                list: state.list.map(x => x.id == action.payload.id ? action.payload : x)
            }

        default:
            return state
    }
}