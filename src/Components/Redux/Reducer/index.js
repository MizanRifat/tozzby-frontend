import { combineReducers } from "redux";

import SessionUserReducer from "../Ducks/SessionUserDuck";

export const reducers = combineReducers({
    sessionUser : SessionUserReducer
})