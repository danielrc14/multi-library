import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

import axiosBooks from '../../axiosInstances/books';
import LibraryItemList from '../LibraryItemList/LibraryItemList';
import NavigationButtons from '../NavigationButtons/NavigationButtons';
import Wrapper from '../../hoc/Wrapper/Wrapper';

class Books extends Component{
    state = {
        books: [],
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
        axiosBooks.get('/volumes', {
            params: {
                q: this.state.searchStr.trim(),
                startIndex: (page-1)*20,
                maxResults: 20
            }
        })
            .then(response => {
                console.log(response.data);
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
                this.setState({books: newBooks});
                this.setState({totalPages: Math.ceil(response.data.totalItems)});
            })
    };

    enterPressedHandler = event => {
        if(event.key === 'Enter'){
            this.searchSubmittedHandler(this.state.page);
        }
    };

    render(){
        let searchResults = null;

        if(this.state.books.length > 0){
            searchResults = (
                <Wrapper>
                    <hr/>
                    <LibraryItemList itemList={this.state.books}/>
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

export default Books;