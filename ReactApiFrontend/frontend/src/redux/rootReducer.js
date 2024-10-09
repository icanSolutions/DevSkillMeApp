import { combineReducers } from 'redux';
// import userReducer from './slices/userSlice';
import authReducer from './slices/authSlice';
// import productReducer from './slices/productSlice';

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;