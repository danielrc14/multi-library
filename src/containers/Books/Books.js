import React, {Component} from 'react';
import {connect} from 'react-redux';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import CircularProgress from 'material-ui/CircularProgress';

import * as actions from '../../store/actions';
import axiosBooks from '../../axiosInstances/books';
import SearchItems from '../../components/SearchItems/SearchItems';
import NavigationButtons from '../../components/NavigationButtons/NavigationButtons';
import Wrapper from '../../hoc/Wrapper/Wrapper';

class Books extends Component{
    state = {
        books: [],
        searchStr: '',
        page: 1,
        totalPages: 1,
        loading: false
    };

    changePage = page => {
        this.setState({page: page});
        this.searchSubmittedHandler(page);
    };

    searchChangedHandler = (event) => {
        this.setState({
            searchStr: event.target.value
        })
    };

    searchSubmittedHandler = (page) => {
        this.setState({loading: true});

        axiosBooks.get('/volumes', {
            params: {
                q: this.state.searchStr.trim(),
                startIndex: (page-1)*20,
                maxResults: 20
            }
        })
            .then(response => {
                const newBooks = response.data.items.map(result => {
                    return {
                        id: result.id,
                        title: result.volumeInfo.title,
                        authors: result.volumeInfo.authors,
                        imagePath: result.volumeInfo.imageLinks ? result.volumeInfo.imageLinks.thumbnail : null,
                        rating: result.volumeInfo.averageRating,
                        releaseDate: result.volumeInfo.publishedDate
                    }
                });
                this.setState({
                    books: newBooks,
                    totalPages: Math.ceil(response.data.totalItems),
                    loading: false
                });
            })
            .catch(err => {
                this.props.onOpenMessage('Couldn\'t get results: ' + err.message)
                this.setState({loading: false});
            })
    };

    enterPressedHandler = event => {
        if(event.key === 'Enter'){
            this.searchSubmittedHandler(this.state.page);
        }
    };

    addToLibraryHandler = book => {
        this.props.onAddLibrary(this.props.token, book, this.props.userId);
    };

    render(){
        let searchResults = null;

        if(this.state.loading){
            searchResults = (
                <Wrapper>
                    <hr/>
                    <CircularProgress size={80} thickness={5} />
                </Wrapper>
            )
        }
        else{
            if(this.state.books.length > 0){
                searchResults = (
                    <Wrapper>
                        <hr/>
                        <SearchItems
                            itemList={this.state.books}
                            libraryItems={this.props.libraryBooks}
                            addHandler={this.addToLibraryHandler}
                            isAuthenticated={this.props.token !== null}
                        />
                        <hr/>
                        <NavigationButtons
                            page={this.state.page}
                            totalPages={this.state.totalPages}
                            changePage={this.changePage}
                        />
                    </Wrapper>
                )
            }
        }

        const paperStyle = {
            padding: '0 10px',
            marginBottom: '15px',
            textAlign: 'center',
            display: 'inline-block',
        };

        return (
            <div>
                <h1>Books</h1>
                <Paper style={paperStyle} zDepth={3}>
                    <TextField
                        value={this.state.searchStr}
                        onChange={this.searchChangedHandler}
                        hintText="Search..."
                        onKeyPress={this.enterPressedHandler}
                    />
                    <IconButton onClick={() => this.searchSubmittedHandler(this.state.page)}>
                        <FontIcon className="material-icons">search</FontIcon>
                    </IconButton>
                </Paper>
                {searchResults}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId,
        libraryBooks: state.library.books
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAddLibrary: (token, item, userId) => dispatch(actions.addLibrary(token, item, 'book', userId)),
        onOpenMessage: (message, messageType) => dispatch(actions.openMessage(message, messageType))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Books);