import React, {Component} from 'react';
import {connect} from 'react-redux';

import LibraryItems from '../../components/LibraryItems/LibraryItems';
import * as actions from '../../store/actions';

class Library extends Component{
    componentDidMount(){
        this.props.onFetchLibrary(this.props.token, this.props.userId)
    };

    removeItemHandler = (item, type) => {
        this.props.onRemoveLibrary(this.props.token, item, type)
    };

    render(){
        return (
            <div>
                <h1>Library</h1>
                <h2>Movies</h2>
                <hr/>
                <LibraryItems
                    itemList={this.props.movies}
                    removeHandler={(item) => this.removeItemHandler(item, 'movie')}
                />
                <h2>Books</h2>
                <hr/>
                <LibraryItems
                    itemList={this.props.books}
                    removeHandler={(item) => this.removeItemHandler(item, 'book')}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId,
        movies: state.library.movies,
        books: state.library.books
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchLibrary: (token, userId) => dispatch(actions.fetchLibrary(token, userId)),
        onRemoveLibrary: (token, item, itemType) => dispatch(actions.removeLibrary(token, item, itemType))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Library);