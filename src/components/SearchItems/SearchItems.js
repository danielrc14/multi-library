import React from 'react';

import './SearchItems.css';
import SearchItem from './SearchItem/SearchItem';

const searchItems = props => {
    return(
        <div className='SearchItems'>
            {props.itemList.map(item => {
                return <SearchItem
                    key={item.id}
                    item={item}
                    addHandler={props.addHandler}
                    added={props.libraryItems.filter(libraryItem => libraryItem.id === item.id).length > 0}
                    isAuthenticated={props.isAuthenticated}
                />
            })}
        </div>
    )
};

export default searchItems;