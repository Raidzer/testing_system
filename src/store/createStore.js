import { combineReducers, configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./users";

const rootReducer = combineReducers({
    session: sessionReducer,
});

export function createStore() {
    return configureStore({
        reducer: rootReducer,
    });
}
