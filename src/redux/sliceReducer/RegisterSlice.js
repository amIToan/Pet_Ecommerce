import { createSlice } from '@reduxjs/toolkit'
const registerSlice = createSlice({
    name: "register",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false
    },
    reducers: {
        registerStart: (state) => {
            state.isFetching = true;
        },
        registerSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
            state.error = false;
        },
        registerFailed: (state, action) => {
            state.isFetching = false;
            state.error = true;
            state.message = action.payload
        }
    }
})
export const { registerStart, registerSuccess, registerFailed } = registerSlice.actions;
export default registerSlice.reducer;