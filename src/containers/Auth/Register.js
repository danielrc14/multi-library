import {connect} from 'react-redux';

import './Auth.css';
import BaseAuth from './BaseAuth';
import * as actions from '../../store/actions';

class Register extends BaseAuth{
    state = {
        controls: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                validation: {
                    required: true
                },
                error: null,
                touched: false
            },
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
            },
            confirmPassword: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Confirm password'
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
    title = 'Register';

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth({
            name: this.state.controls.name.value,
            email: this.state.controls.email.value,
            password: this.state.controls.password.value,
            confirmPassword: this.state.controls.confirmPassword.value
        }, true);
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);