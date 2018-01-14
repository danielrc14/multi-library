import React, {Component} from 'react';
import {connect} from 'react-redux';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

import axiosMovies from '../../axiosInstances/movies';
import axiosDatabase from '../../axiosInstances/database';
import LibraryItems from '../../components/LibraryItems/LibraryItems';
import NavigationButtons from '../../components/NavigationButtons/NavigationButtons';
import Wrapper from '../../hoc/Wrapper/Wrapper';

class Library extends Component{
    state = {
        movies: [],
        books: []
    };

    componentDidMount(){
        const queryParams = '?auth=' + this.props.token + '&orderBy="userId"&equalTo="' + this.props.userId + '"';
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

                this.setState({
                    movies: fetchedMovies,
                    books: fetchedBooks
                });
            })
            .catch(err => {
                console.log(err);
            });
    };

    removeItemHandler = (item, type) => {
        let arrayName = '';
        if(type === 'movie'){
            arrayName = 'movies';
        }
        else if(type === 'book'){
            arrayName = 'books';
        }
        const index = this.state[arrayName].indexOf(item);
        const newArray = [
            ...this.state[arrayName].slice(0, index),
            ...this.state[arrayName].slice(index + 1)
        ];

        this.setState({
            [arrayName]: newArray
        });

        axiosDatabase.delete('/libraryItems/' + item.id + '.json?auth=' + this.props.token)
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                console.log(err)
            });
    };

    render(){
        return (
            <div>
                <h1>Library</h1>
                <h2>Movies</h2>
                <hr/>
                <LibraryItems
                    itemList={this.state.movies}
                    removeHandler={(item) => this.removeItemHandler(item, 'movie')}
                />
                <h2>Books</h2>
                <hr/>
                <LibraryItems
                    itemList={this.state.books}
                    removeHandler={(item) => this.removeItemHandler(item, 'book')}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId
    }
};

export default connect(mapStateToProps)(Library);