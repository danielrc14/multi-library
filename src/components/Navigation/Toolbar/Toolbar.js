import React from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import {Link} from 'react-router-dom';

import './Toolbar.css';

const toolbar = props => {
    let authButtons = (
        <ToolbarGroup>
            <FlatButton label='Login' onClick={props.openLoginModal}/>
            <ToolbarSeparator/>
            <FlatButton label='Register' onClick={props.openRegisterModal}/>
        </ToolbarGroup>
    );

    if(props.isAuth){
        authButtons = (
            <ToolbarGroup>
                <FlatButton label={props.userName}/>
                <ToolbarSeparator/>
                <Link to='/logout'>
                    <FlatButton label='Logout'/>
                </Link>
            </ToolbarGroup>
        )
    }

    return (
        <Toolbar className='Toolbar'>
            <ToolbarGroup firstChild={true}>
                <ToolbarTitle text="Multi Library" style={{paddingLeft: '20px'}}/>
            </ToolbarGroup>
            {authButtons}
        </Toolbar>
    );
};

export default toolbar;