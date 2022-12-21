import { createSlice } from '@reduxjs/toolkit';



const userSlice = createSlice({
    name: "user",
    initialState: {admin: false, loggedIn: false},
    reducers: {
        adminReducer: (state, action) => {
            state.loggedIn = action.payload.loggedIn
        }
    }, 

})


export const {adminReducer} = userSlice.actions;
export default userSlice.reducer;