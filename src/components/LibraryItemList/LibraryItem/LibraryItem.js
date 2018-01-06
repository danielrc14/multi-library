import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {red500} from 'material-ui/styles/colors';

import './LibraryItem.css';

const libraryItem = props => {
    let subtitle = '';

    if(props.item.authors){
        subtitle = props.item.authors.join(', ');
    }
    else if(props.item.releaseDate){
        subtitle = props.item.releaseDate.split('-')[0]
    }

    return(
        <div className='LibraryItem'>
            <img src={props.item.imagePath} alt="" />
            <Card containerStyle={{height: '200px', width: '216.67px'}}>
                <CardHeader textStyle={{paddingRight: '0'}} title={props.item.title} subtitle={subtitle} />
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