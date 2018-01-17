import React, {Component} from 'react';
import {connect} from 'react-redux';
import Snackbar from 'material-ui/Snackbar';

import './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Modal from '../../components/UI/Modal/Modal';
import Register from '../../containers/Auth/Register';
import Login from '../../containers/Auth/Login';
import * as actions from '../../store/actions';

class Layout extends Component{
    render(){
        return (
            <div>
                <Modal show={this.props.loggingIn} modalClosed={this.props.onCloseModals}>
                    <Login
                        modalClosed={this.props.onCloseModals}
                        error={this.props.error}
                    />
                </Modal>
                <Modal show={this.props.registering} modalClosed={this.props.onCloseModals}>
                    <Register
                        modalClosed={this.props.onCloseModals}
                        error={this.props.error}
                    />
                </Modal>
                <Toolbar
                    openLoginModal={this.props.onOpenLogin}
                    openRegisterModal={this.props.onOpenRegister}
                    isAuth={this.props.isAuthenticated}
                    userEmail={this.props.userEmail}
                />
                <div>
                    <SideDrawer
                        style={{marginTop: '60px'}}
                        isAuthenticated={this.props.isAuthenticated}
                    />
                </div>
                <main className='Main'>
                    {this.props.children}
                </main>
                <Snackbar
                    open={this.props.messageOpen}
                    message={this.props.message}
                    autoHideDuration={4000}
                    onRequestClose={this.props.onCloseMessage}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null,
        userEmail: state.auth.userEmail,
        error: state.auth.error,
        loggingIn: state.auth.loggingIn,
        registering: state.auth.registering,
        messageOpen: state.messages.open,
        message: state.messages.message,
        messageType: state.messages.messageType
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onOpenLogin: () => dispatch(actions.openLoginModal()),
        onOpenRegister: () => dispatch(actions.openRegisterModal()),
        onCloseModals: () => dispatch(actions.closeModals()),
        onCloseMessage: () => dispatch(actions.closeMessage())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);