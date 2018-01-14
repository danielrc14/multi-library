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
                />
            })}
        </div>
    )
};

export default searchItems;