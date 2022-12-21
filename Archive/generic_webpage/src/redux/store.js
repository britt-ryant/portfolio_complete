import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import formReducer from './formSlice';



export default configureStore({
    reducer: {
        user: userReducer,
        form: formReducer
    }
})