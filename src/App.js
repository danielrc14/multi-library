import React, { Component } from 'react';
import './App.css';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {red500} from 'material-ui/styles/colors';

import Layout from './hoc/Layout/Layout';
import Games from './components/Games/Games';

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
                        <Games/>
                    </Layout>
                </MuiThemeProvider>
            </div>
        )
    }
}

export default App;
