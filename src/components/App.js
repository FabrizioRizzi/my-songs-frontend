import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Login from './Login/login'
import Home from './Home/home';
import Playlists from './Playlists/playlists';
import Songs from './Songs/songs';
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
    <BrowserRouter>
      <Switch>
        <Route exact path='/login'><Login /></Route>
        <PrivateRoute exact path="/"><Home /></PrivateRoute>
        <PrivateRoute exact path="/playlists"><Playlists /></PrivateRoute>
        <PrivateRoute exact path="/songs"><Songs /></PrivateRoute>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
