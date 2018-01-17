import React, {Component} from 'react';
import {connect} from 'react-redux';

import './WelcomePage.css';
import * as actions from '../../store/actions';

class WelcomePage extends Component{
    render(){
        return (
            <div className='WelcomeText'>
                <h1>Multi Library</h1>
                <h3>Welcome to multi library!</h3>
                <h3><a onClick={this.props.onOpenLogin}>Log in</a> or <a onClick={this.props.onOpenRegister}>register</a> to access to your personal library.</h3>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOpenLogin: () => dispatch(actions.openLoginModal()),
        onOpenRegister: () => dispatch(actions.openRegisterModal())
    }
};

export default connect(null, mapDispatchToProps)(WelcomePage);