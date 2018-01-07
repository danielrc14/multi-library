import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = (isSignup) => {
    return {
        type: actionTypes.AUTH_START,
        isSignup: isSignup
    };
};

export const authSuccess = (token, userId, userEmail) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
        userEmail: userEmail
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(()=>{
            dispatch(logout());
        }, expirationTime*1000);
    };
};

export const auth = (userData, isSignup) => {
    return dispatch => {
        dispatch(authStart(isSignup));
        console.log(userData);
        if(isSignup && userData.password !== userData.confirmPassword){
            dispatch(authFail({message: "Password doesn't match"}));
            return;
        }

        const authData = {
            ...userData,
            returnSecureToken: true
        };
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyB-I8Tf5tVK4EMaS8_fZKmUBKYYalIlf2E';
        if(!isSignup){
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyB-I8Tf5tVK4EMaS8_fZKmUBKYYalIlf2E';
        }
        axios.post(url, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                localStorage.setItem('userEmail', userData.email);
                dispatch(authSuccess(response.data.idToken, response.data.localId, userData.email));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            })
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
};

export const openLoginModal = () => {
    return {
        type: actionTypes.OPEN_LOGIN_MODAL
    }
};

export const openRegisterModal = () => {
    return {
        type: actionTypes.OPEN_REGISTER_MODAL
    }
};

export const closeModals = () => {
    return {
        type: actionTypes.CLOSE_MODALS
    }
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        }
        else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate > new Date()){
                const userId = localStorage.getItem('userId');
                const userEmail = localStorage.getItem('userEmail');
                dispatch(authSuccess(token, userId, userEmail));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
            else{
                dispatch(logout());
            }
        }
    }
};