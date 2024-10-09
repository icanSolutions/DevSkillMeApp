import axios from 'axios';
import { 
    loginSuccess, 
    loginFail, 
    userLoadedSuccess, 
    userLoadedFail, 
    authSuccess, 
    authFail, 
    passwordResetSuccess, 
    passwordResetFail, 
    passwordConfirmSuccess, 
    passwordConfirmFail,
    signUpSuccess,
    signUpFail, 
    activationSuccess,
    activationFail,
    logout,
} from '../slices/authSlice';

// Login user
export const login = (email, password) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };
    alert('your in login');
    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/jwt/create/`, body, config);
        dispatch(loginSuccess(res.data));
        dispatch(loadUser());
        alert(res.data.access)
    } catch (err) {
        dispatch(loginFail());
        alert(`problem in requestm - ${err}`);
    }
};

export const signUp = (name, email, password, re_password) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };
    alert(`your signUp - ${name, password}`);
    const body = JSON.stringify({ first_name: name, email, password, re_password });

    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/users/`, body, config);
        dispatch(signUpSuccess(res.data));
        alert(res.data.access)
    } catch (err) {
        dispatch(signUpFail());
        if (err.response && err.response.data) {
            const errorMessage = err.response.data.email ? err.response.data.email[0] : 'An error occurred during sign up.';
            alert(errorMessage);
        } else {
            alert(`Problem in request: ${err}`);
        }
    }
};

export const activation = (uid, token) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    const body = JSON.stringify({ uid, token });

    try {
        await axios.post(`${import.meta.env.VITE_API_URL}/auth/users/activation/`, body, config);
        dispatch(activationSuccess());
        alert(`your activate`);

    } catch (err) {
        dispatch(activationFail());
        alert(`problem in requestm - ${err}`);
    }
};

export const reset_password = (email) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    const body = JSON.stringify({ email });
    alert(`your in reset Password - ${email}`);

    try {
        await axios.post(`${import.meta.env.VITE_API_URL}/auth/users/reset_password/`, body, config);

        dispatch({
            passwordResetSuccess
        });
    } catch (error) {
        dispatch({
            passwordResetFail
        });
    }
}

export const confirmPassword = (uid, token, new_pass, re_new_pass) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    const body = JSON.stringify({ uid, token, new_pass, re_new_pass });

    try {
        await axios.post(`${import.meta.env.VITE_API_URL}/auth/users/reset_password_confirm/`, body, config);

        dispatch({
            passwordConfirmSuccess
        });
    } catch (error) {
        dispatch({
            passwordConfirmFail
        });
    }
}

export const checkAuth = () => async (dispatch) => {
    if(localStorage.getItem('access')){
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        };

        const body = JSON.stringify({ token: localStorage.getItem('access') });

        try {
            const res = axios.post(`${process.env.VITE_API_URL}/auth/jwt/verify/`, body, config);

            if((await res).data.code !== 'token_not_valide'){
                dispatch(authSuccess());
            } else {
                dispatch(authFail());    
            }
        } catch (error) {
            dispatch(authFail());  
        }
    } else {
        dispatch(authFail());
    }
}

// Load user
export const loadUser = () => async (dispatch) => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json',
            }
        };

        try {
            const res = await axios.get(`${process.env.VITE_API_URL}/auth/users/me/`, config);
            dispatch(userLoadedSuccess(res.data));
        } catch (err) {
            dispatch(userLoadedFail());
        }
    } else {
        dispatch(userLoadedFail());
    }
};