import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';



const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['userState']
}

const rootReducer = combineReducers({
    userState: userReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});