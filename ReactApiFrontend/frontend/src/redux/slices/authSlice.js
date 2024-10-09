import { createSlice } from '@reduxjs/toolkit';

const clearAuthData = (state) => {
    localStorage.setItem('access', null);
    localStorage.setItem('refresh', null);
    state.isAuthenticated = true;
};

const initialState = {
  access: localStorage.getItem('access'),
  refresh: localStorage.getItem('refresh'),
  isAuthenticated: localStorage.getItem('access') == 'null',
  user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess(state, action){
            localStorage.setItem('access', action.payload.access);
            localStorage.setItem('refresh', action.payload.refresh);
            state.isAuthenticated = false;
            // localStorage.setItem('isAuthenticated', true);
            // state.isAuthenticated = true;
            // console.log(action.payload.isAuthenticated);
        },
        loginFail(state){
            clearAuthData(state);
        },
        signUpSuccess(state){
             
        },
        signUpFail(state){

        },
        activationSuccess(state){

        },
        activationFail(state){

        },
        userLoadedSuccess(state, action){
            state.user = action.payload.user
        },
        userLoadedFail(state){
            state.user = null
        },
        authSuccess(state, action){ // in case the access token is invalide
            alert('your in signup success');
            state.isAuthenticated = true;
        },
        authFail(state, action){
            clearAuthData(state);
        },
        logout(state){
            clearAuthData(state);
        },
        passwordResetSuccess(state){
            
        },
        passwordResetFail(state){

        },
        passwordConfirmSuccess(state){

        },
        passwordConfirmFail(state){

        }
    },
});

export const { 
    loginSuccess, 
    loginFail, 
    userLoadedSuccess, 
    userLoadedFail, 
    authSuccess, 
    authFail, 
    logout, 
    passwordResetSuccess, 
    passwordResetFail, 
    passwordConfirmSuccess, 
    passwordConfirmFail,
    signUpSuccess,
    signUpFail,
    activationSuccess,
    activationFail, 
} = authSlice.actions;
export default authSlice.reducer;