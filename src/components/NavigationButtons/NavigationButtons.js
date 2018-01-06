import React from 'react';
import FlatButton from 'material-ui/FlatButton'

import './NavigationButtons.css';

const navigationButtons = props => {
    let buttons = [];

    //First button
    if(props.page >= 5 && props.totalPages >= 8){
        buttons.push(
            <FlatButton onClick={() => props.changePage(1)} style={{minWidth: 0}} label='1'/>
        );
    }

    //...
    if(props.page >= 6 && props.totalPages >= 9){
        buttons.push(<span>...</span>);
    }

    let firstPage = 0;
    let lastPage = 0;

    //7 or less buttons
    if(props.page <= 4){
        firstPage = 1;
        lastPage = Math.min(props.totalPages, 7);
    }
    else if(props.page >= props.totalPages - 3){
        firstPage = Math.max(props.totalPages - 6, 1);
        lastPage = props.totalPages;
    }
    else{
        firstPage = props.page - 3;
        lastPage = props.page + 3;
    }

    for(let i=firstPage; i < props.page; i++){
        buttons.push(
            <FlatButton onClick={() => props.changePage(i)} style={{minWidth: 0}} label={i}/>
        )
    }
    buttons.push(
        <FlatButton onClick={() => props.changePage(props.page)} style={{minWidth: 0}} label={props.page} disabled/>
    );
    for(let i=props.page + 1; i <= lastPage; i++){
        buttons.push(
            <FlatButton onClick={() => props.changePage(i)} style={{minWidth: 0}} label={i}/>
        )
    }

    //...
    if(props.page <= props.totalPages - 5 && props.totalPages >= 9){
        buttons.push(<span>...</span>);
    }

    //Last button
    if(props.page <= props.totalPages - 4 && props.totalPages >= 8){
        buttons.push(
            <FlatButton onClick={() => props.changePage(props.totalPages)} style={{minWidth: 0}} label={props.totalPages}/>
        );
    }

    console.log(firstPage, lastPage);

    return (
        <div className='NavigationButtons'>
            <FlatButton onClick={() => props.changePage(props.page-1)} style={{minWidth: 0}} label='<' disabled={props.page === 1}/>
            {buttons}
            <FlatButton onClick={() => props.changePage(props.page+1)} style={{minWidth: 0}} label='>' disabled={props.page === props.totalPages}/>
        </div>
    );
};

export default navigationButtons;