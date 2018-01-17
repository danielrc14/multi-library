import React, {Component} from 'react';
import {connect} from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';

import LibraryItems from '../../components/LibraryItems/LibraryItems';
import * as actions from '../../store/actions';

class Library extends Component{
    // componentDidMount(){
    //     this.props.onFetchLibrary(this.props.token, this.props.userId)
    // };

    removeItemHandler = (item, type) => {
        this.props.onRemoveLibrary(this.props.token, item, type)
    };

    render(){
        let movies = null;
        let books = null;

        if(this.props.libraryLoading){
            movies = <CircularProgress size={80} thickness={5} />;
            books = <CircularProgress size={80} thickness={5} />;
        }
        else{
            movies = (
                <LibraryItems
                    itemList={this.props.movies}
                    removeHandler={(item) => this.removeItemHandler(item, 'movie')}
                />
            );
            books = (
                <LibraryItems
                    itemList={this.props.books}
                    removeHandler={(item) => this.removeItemHandler(item, 'book')}
                />
            );
        }

        return (
            <div>
                <h1>Library</h1>
                <h2>Movies</h2>
                <hr/>
                {movies}
                <h2>Books</h2>
                <hr/>
                {books}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId,
        libraryLoading: state.library.loading,
        movies: state.library.movies,
        books: state.library.books
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onRemoveLibrary: (token, item, itemType) => dispatch(actions.removeLibrary(token, item, itemType))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Library);