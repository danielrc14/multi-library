import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import * as actions from '../../store/actions';

class Logout extends Component{
    componentDidMount(){
        this.props.onLogout();
        this.props.onClearLibrary();
    }

    render(){
        return (
            <Redirect to='/'/>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout()),
        onClearLibrary: () => dispatch(actions.clearLibrary())
    };
};

export default connect(null, mapDispatchToProps)(Logout);