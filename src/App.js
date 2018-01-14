import React, { Component } from 'react';
import './App.css';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {red500} from 'material-ui/styles/colors';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from './store/actions';

import Layout from './hoc/Layout/Layout';
import Movies from './containers/Movies/Movies';
import Books from './containers/Books/Books';
import Library from './containers/Library/Library';
import Logout from './containers/Auth/Logout';

class App extends Component {
    componentWillMount(){
        this.props.onTryAutoSignup();
    }

    render() {
        const muiTheme = getMuiTheme({
            ...darkBaseTheme,
            toolbar: {
                backgroundColor: red500
            }
        });

        return (
            <div>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <Layout>
                        <Switch>
                            <Route path='/movies' component={Movies}/>
                            <Route path='/books' component={Books}/>
                            <Route path='/library' component={Library}/>
                            <Route path='/logout' component={Logout}/>
                            <Redirect from='/' to='/library'/>
                        </Switch>
                    </Layout>
                </MuiThemeProvider>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    };
};

export default withRouter(connect(null, mapDispatchToProps)(App));
