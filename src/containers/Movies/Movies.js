import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

import axiosMovies from '../../axiosInstances/movies';
import LibraryItemList from '../../components/LibraryItemList/LibraryItemList';
import NavigationButtons from '../../components/NavigationButtons/NavigationButtons';
import Wrapper from '../../hoc/Wrapper/Wrapper';

class Movies extends Component{
    state = {
        movies: [],
        searchStr: '',
        page: 1,
        totalPages: 1
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
        let searchResults = null;

        if(this.state.movies.length > 0){
            searchResults = (
                <Wrapper>
                    <hr/>
                    <LibraryItemList itemList={this.state.movies}/>
                    <hr/>
                    <NavigationButtons
                        page={this.state.page}
                        totalPages={this.state.totalPages}
                        changePage={this.changePage}
                    />
                </Wrapper>
            )
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

export default Movies;