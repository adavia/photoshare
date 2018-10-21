import React, { Component } from 'react';
import { ThemeProvider } from 'emotion-theming';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import appTheme from '../themes/app';

import Private from './layouts/Private';
import Login from './auth/Login';
import Logout from './auth/Logout';
import UserNew from './users/UserNew';
import UserListView from './users/UserListView';
import PhotoListView from './photos/PhotoListView';

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={appTheme}>  
        <BrowserRouter>
          <Switch>
            <Private path="/" exact component={UserListView} />
            <Private path="/photos" exact component={PhotoListView} />
            <Route path="/auth/logout" exact component={Logout} />
            <Route path="/auth/login" exact component={Login} />
            <Route path="/users/new" exact component={UserNew} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    );
  }
}

export default App;
