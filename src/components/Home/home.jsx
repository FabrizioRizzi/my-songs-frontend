import React from 'react';
import { useHistory } from 'react-router-dom';
import { Header, Button } from 'semantic-ui-react';

const Home = () => {

  const history = useHistory();

  const logout = () => {
    localStorage.removeItem('authToken');
    history.replace('/');
  };

  const goToPlaylists = () => history.push('/playlists');

  return (
    <>
      <Header
        as='h2'
        icon="music"
        content='My Songs v. alpha-0.0.1'
        subheader='Music under control'
        textAlign="center"
      />

      <Button onClick={logout}>Logout</Button>
      <Button onClick={goToPlaylists} content='Playlists' icon="like" />
    </>
  );
}

export default Home;