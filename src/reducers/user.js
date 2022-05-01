import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userReducer = createSlice({
    name: "user",
    initialState: {
        user: {},
    },
    reducers: {
        setProfile: (state, { payload }) => {
            state.user = payload;
        },
    },
});

export const { setProfile } = userReducer.actions;
export default userReducer.reducer;
