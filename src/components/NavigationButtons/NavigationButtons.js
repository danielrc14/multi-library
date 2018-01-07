import React from 'react';

import './NavigationButtons.css';
import NavigationButton from './NagivationButton/NavigationButton';

const navigationButtons = props => {
    let buttons = [];

    //First button
    if(props.page >= 5 && props.totalPages >= 8){
        buttons.push(
            <NavigationButton
                key='1'
                changePage={props.changePage}
                page={1}
            />
        );
    }

    //...
    if(props.page >= 6 && props.totalPages >= 9){
        buttons.push(<span key='first...'>...</span>);
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
            <NavigationButton
                key={i}
                changePage={props.changePage}
                page={i}
            />
        )
    }
    buttons.push(
        <NavigationButton
            key={props.page}
            changePage={props.changePage}
            page={props.page}
            disabled
        />
    );
    for(let i=props.page + 1; i <= lastPage; i++){
        buttons.push(
            <NavigationButton
                key={i}
                changePage={props.changePage}
                page={i}
            />
        )
    }

    //...
    if(props.page <= props.totalPages - 5 && props.totalPages >= 9){
        buttons.push(<span key='last...'>...</span>);
    }

    //Last button
    if(props.page <= props.totalPages - 4 && props.totalPages >= 8){
        buttons.push(
            <NavigationButton
                key={props.totalPages}
                changePage={props.changePage}
                page={props.totalPages}
            />
        );
    }

    return (
        <div className='NavigationButtons'>
            <NavigationButton
                key='<'
                changePage={props.changePage}
                label='<'
                page={props.page-1}
                disabled={props.page === 1}
            />
            {buttons}
            <NavigationButton
                key='>'
                changePage={props.changePage}
                label='>'
                page={props.page+1}
                disabled={props.page === props.totalPages}
            />
        </div>
    );
};

export default navigationButtons;