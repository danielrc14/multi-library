import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../utility";

const initialState = {
    token: null,
    userId: null,
    userEmail: null,
    userName: null,
    error: null,
    loading: false,
    loggingIn: false,
    registering: false
};

const authStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
        loggingIn: !action.isSignup,
        registering: action.isSignup
    });
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.idToken,
        userId: action.userId,
        userEmail: action.userEmail,
        userName: action.userName,
        error: null,
        loading: false,
        loggingIn: false,
        registering: false
    });
};

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        userId: null,
        userEmail: null,
        userName: null
    })
};

const openLoginModal = (state, action) => {
    return updateObject(state, {loggingIn: true, registering: false})
};

const openRegisterModal = (state, action) => {
    return updateObject(state, {loggingIn: false, registering: true})
};

const closeModals = (state, action) => {
    return updateObject(state, {loggingIn: false, registering: false, error: null})
};

const reducer = (state=initialState, action) => {
    switch(action.type){
        case actionTypes.AUTH_START:
            return authStart(state, action);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTH_FAIL:
            return authFail(state, action);
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action);
        case actionTypes.OPEN_LOGIN_MODAL:
            return openLoginModal(state, action);
        case actionTypes.OPEN_REGISTER_MODAL:
            return openRegisterModal(state, action);
        case actionTypes.CLOSE_MODALS:
            return closeModals(state, action);
        default:
            return state;
    }
};

export default reducer;