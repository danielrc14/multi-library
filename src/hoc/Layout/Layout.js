import React from 'react';

import './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const layout = props => {
    return (
        <div>
            <Toolbar/>
            <div>
                <SideDrawer style={{marginTop: '60px'}}/>
            </div>
            <main className='Main'>
                {props.children}
            </main>
        </div>
    )
};

export default layout;