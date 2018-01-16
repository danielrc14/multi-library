import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../utility";

const initialState = {
    open: false,
    message: '',
    messageType: null
};

const openMessage = (state, action) => {
    return updateObject(state, {
        open: true,
        message: action.message,
        messageType: action.messageType
    })
};

const closeMessage = (state, action) => {
    return updateObject(state, {
        open: false,
        message: '',
        messageType: null
    })
};

const reducer = (state=initialState, action) => {
    switch(action.type){
        case actionTypes.OPEN_MESSAGE:
            return openMessage(state, action);
        case actionTypes.CLOSE_MESSAGE:
            return closeMessage(state, action);
        default:
            return state;
    }
};

export default reducer;