import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {NavLink} from 'react-router-dom';

import './SideDrawer.css';

const sideDrawer = props => {
    return (
        <Drawer containerClassName='SideDrawer'>
            <NavLink to='/movies'>
                <MenuItem>Movies</MenuItem>
            </NavLink>
            <NavLink to='/books'>
                <MenuItem>Books</MenuItem>
            </NavLink>
        </Drawer>
    )
};

export default sideDrawer;