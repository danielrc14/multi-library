import React, { Component } from 'react';
import './App.css';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {red500} from 'material-ui/styles/colors';
import {Route, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from './store/actions';

import Layout from './hoc/Layout/Layout';
import Movies from './containers/Movies/Movies';
import Books from './containers/Books/Books';
import Logout from './containers/Auth/Logout';

class App extends Component {
    componentDidMount(){
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
                            <Route path='/logout' component={Logout}/>
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
