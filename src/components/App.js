import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { Grommet } from "grommet";
import { grommet } from "grommet/themes";
import Login from './Login/login'
import Home from './Home/home';
import Playlists from './Playlists/playlists';
import verifyToken from '../verifyToken';

const PrivateRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        verifyToken(localStorage.getItem('authToken')) ?
          children :
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
      }
    />
  );
}

const App = () => {
  return (
    <Grommet full theme={grommet}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/login'><Login /></Route>
          <PrivateRoute exact path="/"><Home /></PrivateRoute>
          <PrivateRoute exact path="/playlists"><Playlists /></PrivateRoute>
        </Switch>
      </BrowserRouter>
    </Grommet>
  );
};

export default App;
