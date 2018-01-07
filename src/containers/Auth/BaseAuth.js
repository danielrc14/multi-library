import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {red500} from 'material-ui/styles/colors';

import './Auth.css';
import Input from '../../components/UI/Input/Input';

class BaseAuth extends Component{
    state = {
        controls: {}
    };
    title = null;

    checkValidity(value, rules) {
        let isValid = true;
        let error = null;

        if (!rules) {
            return null;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
            if(!isValid){
                error = 'This field is required'
            }
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
            if(!isValid){
                error = 'The field needs to be at least ' + rules.minLength + ' characters';
            }
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
            if(!isValid){
                error = 'This field is required'
            }
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid;
            if(!isValid){
                error = 'Please enter an email'
            }
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid;
            if(!isValid){
                error = 'Please enter numeric characters'
            }
        }

        return error;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                error: this.checkValidity(event.target.value, this.state.controls[controlName].validation)
            }
        };
        this.setState({
            controls: updatedControls
        });
    };

    setTouched = (event, controlName) => {
        this.setState({controls: {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                touched: true,
                error: this.checkValidity(event.target.value, this.state.controls[controlName].validation)
            }
        }});
    };

    submitHandler = event => {

    };

    render(){
        const formElementsArray = [];
        for(let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <h3>{this.title}</h3>
                    {formElementsArray.map(formElem => (
                        <Input
                            key={formElem.id}
                            {...formElem.config.elementConfig}
                            value={formElem.config.value}
                            changed={(event) => this.inputChangedHandler(event, formElem.id)}
                            error={formElem.config.error}
                            touched={formElem.config.touched}
                            setTouched={(event) => this.setTouched(event, formElem.id)}
                        />
                    ))}
                    <p style={{color: red500}}>{this.props.error ? this.props.error.message : null}</p>
                    <div className='Buttons'>
                        <RaisedButton backgroundColor='#252525' type='submit' style={{marginRight: '20px'}} label='Send'/>
                        <RaisedButton backgroundColor='#252525' type='button' label='Cancel' onClick={this.props.modalClosed}/>
                    </div>
                </form>
            </div>
        )
    }
}

export default BaseAuth;