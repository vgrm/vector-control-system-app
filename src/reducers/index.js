import { combineReducers } from "redux";
import { projectSet } from './projectSet';
import { projectData } from './projectData';
import { user } from './user';

export const reducers = combineReducers({
    projectSet,
    projectData,
    user
})