import * as actionTypes from './actionTypes';

export const openMessage = (message, messageType) => {
    return {
        type: actionTypes.OPEN_MESSAGE,
        message: message,
        messageType: messageType
    }
};

export const closeMessage = () => {
    return {
        type: actionTypes.CLOSE_MESSAGE
    }
};