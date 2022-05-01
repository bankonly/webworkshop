import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./reducers/counter";
import userReducer from "./reducers/user";

export default configureStore({
    reducer: {
        counter: counterReducer,
        user: userReducer,
    },
});
