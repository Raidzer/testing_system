import { combineReducers, configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./session";
import registerReduser from "./register";
import userReduser from "./user"

const rootReducer = combineReducers({
    session: sessionReducer,
    register: registerReduser,
    user: userReduser,
});

export function createStore() {
    return configureStore({
        reducer: rootReducer,
    });
}
