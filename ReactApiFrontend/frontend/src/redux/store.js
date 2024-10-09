import rootReducer from './rootReducer';
import { configureStore } from  '@reduxjs/toolkit';

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',

});





