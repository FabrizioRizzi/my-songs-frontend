import React from 'react';
import { useHistory } from 'react-router-dom';
import { Main, Button } from 'grommet';

const Home = () => {

  const history = useHistory();

  const clicca = () => {
    localStorage.removeItem('authToken');
    history.replace('/');
  };

  const goToPlaylists = () => history.push('/playlists');

  return (
    <Main pad="large">
      <Button onClick={clicca} label="LogOut" primary />
      <Button onClick={goToPlaylists} label="Playlists" primary />
    </Main>
  );
}

export default Home;