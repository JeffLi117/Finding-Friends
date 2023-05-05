import React, { useState } from 'react';
import Pic1Holder from './Pic1Holder';
import Nav from './Nav';
import styles from './App.css';

function App() {
  /* const [clicked, setClicked] = useState(false);

  function handlerClicked() {
    setClicked(!clicked);
  } */

  return (
    <div className="App">
      <Nav />
      <Pic1Holder 
        /* handlerClicked={handlerClicked} */
      />
    </div>
  );


  return (
    <div>
      <Pic1Holder 
        /* handlerClicked={handlerClicked} */
      />
    </div>
  )
}

export default App