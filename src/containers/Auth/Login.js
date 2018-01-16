import {connect} from 'react-redux';

import './Auth.css';
import BaseAuth from './BaseAuth';
import * as actions from '../../store/actions';

class Login extends BaseAuth{
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                error: null,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                error: null,
                touched: false
            }
        },
        error: this.props.error
    };
    title = 'Login';

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth({
            email: this.state.controls.email.value,
            password: this.state.controls.password.value
        }, false);
    };
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (userData, isSignup) => dispatch(actions.auth(userData, isSignup))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);