import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../utility";

const initialState = {
    movies: [],
    books: [],
    error: null,
    loading: false
};

//**********************FETCH LIBRARY ITEMS**********************

const fetchLibraryStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const fetchLibrarySuccess = (state, action) => {
    return updateObject(state, {
        movies: action.movies,
        books: action.books,
        error: null,
        loading: false
    });
};

const fetchLibraryFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

//*************************ADD LIBRARY ITEM***********************

const addLibraryStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    })
};

const addLibrarySuccess = (state, action) => {
    let arrayName = '';
    if(action.itemType === 'movie'){
        arrayName = 'movies';
    }
    else if(action.itemType === 'book'){
        arrayName = 'books';
    }

    const newArray = state[arrayName].concat(action.item);

    return updateObject(state, {
        [arrayName]: newArray,
        error: null,
        loading: false
    })
};

const addLibraryFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    })
};

//************************REMOVE LIBRARY ITEM****************************

const removeLibraryStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const removeLibrarySuccess = (state, action) => {
    let arrayName = '';
    if(action.itemType === 'movie'){
        arrayName = 'movies';
    }
    else if(action.itemType === 'book'){
        arrayName = 'books';
    }
    const index = state[arrayName].indexOf(action.item);
    const newArray = [
        ...state[arrayName].slice(0, index),
        ...state[arrayName].slice(index + 1)
    ];

    return updateObject(state, {
        [arrayName]: newArray,
        error: null,
        loading: false
    });
};

const removeLibraryFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

//*****************************CLEAR LIBRARY*****************************

const clearLibrary = (state, action) => {
    return updateObject(state, {
        movies: [],
        books: [],
        error: null,
        loading: false
    })
};

//********************************REDUCER********************************

const reducer = (state=initialState, action) => {
    switch(action.type){
        case actionTypes.FETCH_LIBRARY_START:
            return fetchLibraryStart(state, action);
        case actionTypes.FETCH_LIBRARY_SUCCESS:
            return fetchLibrarySuccess(state, action);
        case actionTypes.FETCH_LIBRARY_FAIL:
            return fetchLibraryFail(state, action);
        case actionTypes.ADD_LIBRARY_START:
            return addLibraryStart(state, action);
        case actionTypes.ADD_LIBRARY_SUCCESS:
            return addLibrarySuccess(state, action);
        case actionTypes.ADD_LIBRARY_FAIL:
            return addLibraryFail(state, action);
        case actionTypes.REMOVE_LIBRARY_START:
            return removeLibraryStart(state, action);
        case actionTypes.REMOVE_LIBRARY_SUCCESS:
            return removeLibrarySuccess(state, action);
        case actionTypes.REMOVE_LIBRARY_FAIL:
            return removeLibraryFail(state, action);
        case actionTypes.CLEAR_LIBRARY:
            return clearLibrary(state, action);
        default:
            return state;
    }
};

export default reducer;