import React, {Component} from 'react';

import LibraryItemList from '../LibraryItemList/LibraryItemList';

class Games extends Component{
    render(){
        return (
            <div>
                <h1>Games</h1>
                <hr/>
                <LibraryItemList/>
            </div>
        );
    }
}

export default Games;