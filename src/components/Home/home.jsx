import React from 'react';
import { useHistory } from 'react-router-dom';
import { Main, Button, Header } from 'grommet';
import { Logout } from 'grommet-icons';

const Home = () => {

  const history = useHistory();

  const logout = () => {
    localStorage.removeItem('authToken');
    history.replace('/');
  };

  const goToPlaylists = () => history.push('/playlists');

  return (
    <>
      <Header background="brand" justify="between" pad="small">
        My Songs v. alpha-0.0.1
        <Button icon={<Logout />} onClick={logout} hoverIndicator />
      </Header>
      <Main pad="large">
        <Button onClick={goToPlaylists} label="Playlists" primary />
      </Main>
    </>
  );
}

export default Home;