import React, {Component} from 'react';
import {connect} from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';
import CopyClipboard from 'react-copy-to-clipboard';

import LibraryItems from '../../components/LibraryItems/LibraryItems';
import * as actions from '../../store/actions';
import axiosDatabase from '../../axiosInstances/database';

class Library extends Component{
    state = {
        movies: [],
        books: [],
        loading: false,
        name: null
    };

    componentDidMount(){
        if(this.props.match.params.userId && this.props.match.params.userId !== this.props.userId){
            this.setState({loading: true});

            axiosDatabase.get('/users/' + this.props.match.params.userId + '.json')
                .then(response => {
                    this.setState({
                        name: response.data.name
                    })
                })
                .catch(err => {
                    this.props.onOpenMessage('Couldn\'t access user: ' + err.message, 'error');
                    this.setState({loading: false});
                });

            const queryParams = '?orderBy="userId"&equalTo="' + this.props.match.params.userId + '"';
            axiosDatabase.get('/libraryItems.json' + queryParams)
                .then(response => {
                    const fetchedMovies = [];
                    const fetchedBooks = [];
                    for(let key in response.data){
                        const item = response.data[key];
                        if(item.type === 'movie'){
                            fetchedMovies.push({
                                ...item.elemInfo,
                                dbId: key
                            });
                        }
                        else if(item.type === 'book'){
                            fetchedBooks.push({
                                ...item.elemInfo,
                                dbId: key
                            });
                        }
                    }
                    this.setState({
                        movies: fetchedMovies,
                        books: fetchedBooks,
                        loading: false
                    })
                })
                .catch(err => {
                    this.props.onOpenMessage('Couldn\'t access library: ' + err.message, 'error');
                    this.setState({loading: false});
                });
        }
    };

    removeItemHandler = (item, type) => {
        this.props.onRemoveLibrary(this.props.token, item, type)
    };

    render(){
        let movies = null;
        let books = null;
        let shareLink = null;

        if(this.props.match.params.userId && this.props.match.params.userId !== this.props.userId){
            if(this.state.loading){
                movies = <CircularProgress size={80} thickness={5} />;
                books = <CircularProgress size={80} thickness={5} />;
            }
            else{
                movies = (
                    <LibraryItems
                        itemList={this.state.movies}
                    />
                );
                books = (
                    <LibraryItems
                        itemList={this.state.books}
                    />
                );
            }
        }
        else{
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

            const paperStyle = {
                padding: '0 10px',
                marginTop: '40px',
                textAlign: 'center',
                display: 'inline-block',
            };
            shareLink = (
                <Paper style={paperStyle} zDepth={3}>
                    <span style={{marginRight: '10px'}}>Share link:</span>
                    <TextField value={window.location.href + '/' + this.props.userId} type='text'/>
                    <CopyClipboard text={window.location.href + '/' + this.props.userId}>
                        <IconButton>
                            <FontIcon className="material-icons">content_copy</FontIcon>
                        </IconButton>
                    </CopyClipboard>
                </Paper>
            );
        }

        return (
            <div>
                <h1>{this.state.name ? this.state.name + '\'s Library' : 'Library'}</h1>
                <h2>Movies</h2>
                <hr/>
                {movies}
                <h2>Books</h2>
                <hr/>
                {books}
                {shareLink}
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
        onRemoveLibrary: (token, item, itemType) => dispatch(actions.removeLibrary(token, item, itemType)),
        onOpenMessage: (message, messageType) => dispatch(actions.openMessage(message, messageType))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Library);