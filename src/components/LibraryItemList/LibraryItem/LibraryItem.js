import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {red500} from 'material-ui/styles/colors';

import './LibraryItem.css';

const libraryItem = props => {
    const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

    return(
        <div className='LibraryItem'>
            <img src={imageBaseUrl + props.item.posterPath} alt="" />
            <Card containerStyle={{height: '200px', width: '216.67px'}}>
                <CardHeader textStyle={{paddingRight: '0'}} title={props.item.title} subtitle={props.item.releaseDate.split('-')[0]} />
                <CardText>
                    Rating: {props.item.rating}
                </CardText>
                <CardActions>
                    <FlatButton style={{color: red500}} label="Add to Library" />
                </CardActions>
            </Card>
        </div>
    );
};

export default libraryItem;