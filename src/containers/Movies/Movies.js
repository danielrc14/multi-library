import React, {Component} from 'react';
import {connect} from 'react-redux';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import CircularProgress from 'material-ui/CircularProgress';

import * as actions from '../../store/actions';
import axiosMovies from '../../axiosInstances/movies';
import SearchItems from '../../components/SearchItems/SearchItems';
import NavigationButtons from '../../components/NavigationButtons/NavigationButtons';
import Wrapper from '../../hoc/Wrapper/Wrapper';

class Movies extends Component{
    state = {
        movies: [],
        searchStr: '',
        page: 1,
        totalPages: 1,
        loading: false
    };
    posterBaseURL = 'https://image.tmdb.org/t/p/w500';

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

        axiosMovies.get('/search/movie', {
            params: {
                query: this.state.searchStr.trim(),
                page: page
            }
        })
            .then(response => {
                const newMovies = response.data.results.map(result => {
                    return {
                        id: result.id,
                        title: result.title,
                        imagePath: this.posterBaseURL + result.poster_path,
                        rating: result.vote_average,
                        releaseDate: result.release_date
                    }
                });
                this.setState({
                    movies: newMovies,
                    totalPages: response.data.total_pages,
                    loading: false
                });
            })
            .catch(err => {
                this.props.onOpenMessage('Couldn\'t get results: ' + err.message);
                this.setState({loading: false});
            })
    };

    enterPressedHandler = event => {
        if(event.key === 'Enter'){
            this.searchSubmittedHandler(this.state.page);
        }
    };

    addToLibraryHandler = movie => {
        this.props.onAddLibrary(this.props.token, movie, this.props.userId);
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
            if(this.state.movies.length > 0){
                searchResults = (
                    <Wrapper>
                        <hr/>
                        <SearchItems
                            itemList={this.state.movies}
                            libraryItems={this.props.libraryMovies}
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
                <h1>Movies</h1>
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
        libraryMovies: state.library.movies
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAddLibrary: (token, item, userId) => dispatch(actions.addLibrary(token, item, 'movie', userId)),
        onOpenMessage: (message, messageType) => dispatch(actions.openMessage(message, messageType))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Movies);