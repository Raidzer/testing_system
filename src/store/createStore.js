import { combineReducers, configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./session";
import registerReduser from "./register";
import userReduser from "./user"
import lessonReducer from "./lesson";
import themesReducer from "./themes";

const rootReducer = combineReducers({
    session: sessionReducer,
    register: registerReduser,
    user: userReduser,
    lesson: lessonReducer,
    themes: themesReducer,
});

export function createStore() {
    return configureStore({
        reducer: rootReducer,
    });
}
