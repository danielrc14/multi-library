import React, { Component } from 'react';
import './App.css';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {red500} from 'material-ui/styles/colors';
import {Route, Switch} from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Movies from './components/Movies/Movies';
import Books from './components/Books/Books';

class App extends Component {
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
                        </Switch>
                    </Layout>
                </MuiThemeProvider>
            </div>
        )
    }
}

export default App;
