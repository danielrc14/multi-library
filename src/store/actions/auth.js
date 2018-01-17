import axios from 'axios';

import * as actionTypes from './actionTypes';
import {fetchLibrary} from "./library";
import axiosDatabase from '../../axiosInstances/database';

export const authStart = (isSignup) => {
    return {
        type: actionTypes.AUTH_START,
        isSignup: isSignup
    };
};

export const authSuccess = (token, userId, userEmail, userName) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
        userEmail: userEmail,
        userName: userName
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
    localStorage.removeItem('userName');
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
                //Get user in database
                let userName = null;
                if(isSignup){
                    thenAuth(dispatch, response, userData.name);
                    axiosDatabase.post('/users.json?auth=' + response.data.idToken, {
                        name: userData.name,
                        email: userData.email
                    })
                        .then(response2 => {
                        })
                        .catch(err => {
                            dispatch(authFail(err.response.data.error));
                        });
                }
                else{
                    axiosDatabase.get('/users/' + response.data.localId + '.json')
                        .then(response2 => {
                            userName = response2.data.name;

                            thenAuth(dispatch, response, userName);
                        })
                        .catch(err => {
                            dispatch(authFail(err.response.data.error));
                        });
                }
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            })
    };
};

const thenAuth = (dispatch, response, userName) => {
    const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
    localStorage.setItem('token', response.data.idToken);
    localStorage.setItem('expirationDate', expirationDate);
    localStorage.setItem('userId', response.data.localId);
    localStorage.setItem('userEmail', response.data.email);
    localStorage.setItem('userName', userName);
    dispatch(authSuccess(response.data.idToken, response.data.localId, response.data.email, userName));
    dispatch(checkAuthTimeout(response.data.expiresIn));
    dispatch(fetchLibrary(response.data.idToken, response.data.localId));
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
                const userName = localStorage.getItem('userName');
                dispatch(authSuccess(token, userId, userEmail, userName));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
                dispatch(fetchLibrary(token, userId))
            }
            else{
                dispatch(logout());
            }
        }
    }
};