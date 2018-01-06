import React from 'react';

import './LibraryItemList.css';
import LibraryItem from './LibraryItem/LibraryItem';

const libraryItemList = props => {
    return(
        <div className='LibraryItemList'>
            {props.itemList.map(item => {
                return <LibraryItem
                    key={item.id}
                    item={item}/>
            })}
        </div>
    )
};

export default libraryItemList;