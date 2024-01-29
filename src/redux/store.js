import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import cardReducer from "./slices/cardSlice";
import chestReducer from "./slices/chestSlice";

export const store = configureStore({
    reducer: {
        user : userReducer,
        card : cardReducer,
        chest: chestReducer,
    },
})