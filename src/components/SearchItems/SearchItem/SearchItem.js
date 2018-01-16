import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {red500, green500} from 'material-ui/styles/colors';

import './SearchItem.css';

const searchItem = props => {
    let subtitle = '';

    if(props.item.authors){
        subtitle = props.item.authors.join(', ');
    }
    else if(props.item.releaseDate){
        subtitle = props.item.releaseDate.split('-')[0]
    }

    let button = null;
    if(props.isAuthenticated){
        if(props.added){
            button = (
                <FlatButton
                    style={{color: green500}}
                    label="Added"
                    disabled
                />
            )
        }
        else{
            button = (
                <FlatButton
                    style={{color: red500}}
                    label="Add to Library"
                    onClick={() => props.addHandler(props.item)}
                />
            );
        }
    }

    return(
        <div className='SearchItem'>
            <img src={props.item.imagePath} alt="" />
            <Card containerStyle={{height: '200px', width: '216.67px'}}>
                <CardHeader
                    textStyle={{paddingRight: '0'}}
                    title={props.item.title}
                    subtitle={subtitle}
                />
                <CardText>
                    Rating: {props.item.rating}
                </CardText>
                <CardActions>
                    {button}
                </CardActions>
            </Card>
        </div>
    );
};

export default searchItem;