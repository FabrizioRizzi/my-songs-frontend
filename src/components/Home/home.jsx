import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'grommet';

const Home = () => {

  const history = useHistory();

  const clicca = () => {
    localStorage.removeItem('authToken');
    history.replace('/');
  };

  return (
    <div>
      <div>Home</div>
      <Button onClick={clicca} label="LogOut" primary />
    </div>
  );

}

export default Home;