import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import nanoid from '@reduxjs/toolkit';

export const addInfoAsync = createAsyncThunk(
    '/add',
    async(payload) => {
        console.log(payload);
        const id = nanoid();
        const response = await fetch(`http://localhost:5000/addInfo`,
        {
            method: 'POST',
            headers: {
                'content-type' : 'application/json',
            },
            body: JSON.stringify({  id: id, 
                                    fname: payload.first, 
                                    lname: payload.last, 
                                    email: payload.email
                                })
        })
        if(response.ok){
            const entry = await response.json();
            console.log(entry);
            return entry;
        }
    }
)


const formSlice = createSlice({
    name: "form",
    initialState: {data: {}, submitted: false},
    reducers: {
        infoReducer: (state, action) => {
            state.submitted = action.payload.submitted
        }
    }, 
    extraReducers: {
        [addInfoAsync.pending]: (state, action) => {
            console.log("posting request form information to db");
        },
        [addInfoAsync.fulfilled]: (state, action) => {
            console.log("posted request form information to db");
        }
    }


})

export const { infoReducer } = formSlice.actions;
export default formSlice.reducer;