import { combineReducers } from "redux";
import { projectSet } from './projectSet';
import { projectData } from './projectData';
import { user } from './user';
import { line } from './line';
import { arc } from './arc';

export const reducers = combineReducers({
    projectSet,
    projectData,
    user,
    line,
    arc
})