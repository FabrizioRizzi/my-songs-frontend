import React from 'react';
import './App.css';
import axios from 'axios';


function App() {

  const clicca = () => {
    const data = { email: "fabrizio@fabriziorizzi.it", password: "mysongs9" };

    axios.post('https://my-songs-backend.herokuapp.com/authentication/login/', data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  return (
    <div className="App">
      <button onClick={clicca}>Clicca login</button>

    </div>
  );
}

export default App;
