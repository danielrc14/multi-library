import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

import axiosMovies from '../../axiosInstances/movies';
import LibraryItemList from '../LibraryItemList/LibraryItemList';
import NavigationButtons from '../NavigationButtons/NavigationButtons';

class Movies extends Component{
    state = {
        movies: [
            {
                id: 1,
                title: 'Fight Club',
                posterPath: '/adw6Lq9FiC9zjYEpOqfq03ituwp.jpg',
                rating: 8.4,
                genres: ['Hola', 'Chao'],
                releaseDate: '111'
            },
            {
                id: 2,
                title: 'Mad Max',
                posterPath: '/kqjL17yufvn9OVLyXYpvtyrFfak.jpg',
                rating: 9.0,
                genres: ['Hola', 'Chao'],
                releaseDate: '111'
            }
        ],
        searchStr: '',
        page: 1,
        totalPages: 1
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
        axiosMovies.get('/search/movie', {
            params: {
                query: this.state.searchStr.trim(),
                page: page
            }
        })
            .then(response => {
                console.log(response.data);
                const newMovies = response.data.results.map(result => {
                    return {
                        id: result.id,
                        title: result.title,
                        posterPath: result.poster_path,
                        rating: result.vote_average,
                        genres: result.genre_ids,
                        releaseDate: result.release_date
                    }
                });
                this.setState({movies: newMovies});
                this.setState({totalPages: response.data.total_pages});
            })
    };

    enterPressedHandler = event => {
        if(event.key === 'Enter'){
            this.searchSubmittedHandler(this.state.page);
        }
    };

    render(){
        const style = {
            padding: '0 10px',
            marginBottom: '15px',
            textAlign: 'center',
            display: 'inline-block',
        };

        return (
            <div>
                <h1>Movies</h1>
                <Paper style={style} zDepth={3}>
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
                <hr/>
                <LibraryItemList itemList={this.state.movies}/>
                <hr/>
                <NavigationButtons
                    page={this.state.page}
                    totalPages={this.state.totalPages}
                    changePage={this.changePage}/>
            </div>
        );
    }
}

export default Movies;