import * as actionTypes from './actionTypes';
import axiosDatabase from '../../axiosInstances/database';

//**********************FETCH LIBRARY ITEMS**********************

export const fetchLibrarySuccess = (library) => {
    return {
        type: actionTypes.FETCH_LIBRARY_SUCCESS,
        movies: library.movies,
        books: library.books
    }
};

export const fetchLibraryFail = (error) => {
    return {
        type: actionTypes.FETCH_LIBRARY_FAIL,
        error: error
    }
};

export const fetchLibraryStart = () => {
    return {
        type: actionTypes.FETCH_LIBRARY_START
    }
};

export const fetchLibrary = (token, userId) => {
    return dispatch => {
        dispatch(fetchLibraryStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axiosDatabase.get('/libraryItems.json' + queryParams)
            .then(response => {
                const fetchedMovies = [];
                const fetchedBooks = [];
                for(let key in response.data){
                    const item = response.data[key];
                    if(item.type === 'movie'){
                        fetchedMovies.push({
                            ...item.elemInfo,
                            id: key
                        });
                    }
                    else if(item.type === 'book'){
                        fetchedBooks.push({
                            ...item.elemInfo,
                            id: key
                        });
                    }
                }
                dispatch(fetchLibrarySuccess({movies: fetchedMovies, books: fetchedBooks}));
            })
            .catch(err => {
                dispatch(fetchLibraryFail(err));
            });
    };
};

//*************************ADD LIBRARY ITEM***********************

export const addLibrarySuccess = (item, itemType) => {
    return {
        type: actionTypes.ADD_LIBRARY_SUCCESS,
        item: item,
        itemType: itemType
    }
};

export const addLibraryFail = error => {
    return {
        type: actionTypes.ADD_LIBRARY_FAIL,
        error: error
    }
};

export const addLibraryStart = () => {
    return {
        type: actionTypes.ADD_LIBRARY_START
    }
};

export const addLibrary = (token, item, itemType, userId) => {
    return dispatch => {
        dispatch(addLibraryStart());
        axiosDatabase.post('/libraryItems.json?auth='+token, {
            elemInfo: {...item},
            type: itemType,
            userId: userId
        })
            .then(response => {
                dispatch(addLibrarySuccess(item, itemType));
            })
            .catch(err => {
                dispatch(addLibraryFail(err));
            })
    }
};

//*************************REMOVE LIBRARY ITEM**************************

export const removeLibrarySuccess = (item, itemType) => {
    return {
        type: actionTypes.REMOVE_LIBRARY_SUCCESS,
        item: item,
        itemType: itemType
    }
};

export const removeLibraryFail = error => {
    return {
        type: actionTypes.REMOVE_LIBRARY_FAIL,
        error: error
    }
};

export const removeLibraryStart = () =>{
    return {
        type: actionTypes.REMOVE_LIBRARY_START
    }
};

export const removeLibrary = (token, item, itemType) => {
    return dispatch => {
        dispatch(removeLibraryStart());
        axiosDatabase.delete('/libraryItems/' + item.id + '.json?auth=' + token)
            .then(response => {
                dispatch(removeLibrarySuccess(item, itemType));
            })
            .catch(err => {
                dispatch(removeLibraryFail(err));
            });
    }
};

//*****************************CLEAR LIBRARY********************************

export const clearLibrary = () => {
    return {
        type: actionTypes.CLEAR_LIBRARY
    }
};