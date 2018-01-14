import React from 'react';

import './LibraryItems.css';
import LibraryItem from './LibraryItem/LibraryItem';

const libraryItems = props => {
    return(
        <div className='LibraryItems'>
            {props.itemList.map(item => {
                return <LibraryItem
                    key={item.id}
                    item={item}
                    removeHandler={props.removeHandler}
                />
            })}
        </div>
    )
};

export default libraryItems;