import { createSlice } from "@reduxjs/toolkit";

const initialstate = {
    user : null,
    isAunthenticated : false,
}

const authSlice = createSlice({
    name : 'authSlice',
    initialState : initialstate,
    reducers : {
        userLoggedin : (state,action) => {
            state.user = action.payload.user;
            state.isAunthenticated = true;
        },
        userLoggedOut : (state,action) => {
            state.user = null;
            state.isAunthenticated = false;
        }
    }
})

export const {userLoggedin , userLoggedOut} = authSlice.actions;
export default authSlice.reducer;