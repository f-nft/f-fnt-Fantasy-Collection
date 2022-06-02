import React from 'react';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import Popup from './Popup';
 
function App() {
  const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
 
  return <div>
    <input
      type="button"
      value="Mint"
      onClick={togglePopup}
    />
    <p> <Popup
      content={<>
        <b></b>
        <p></p>
        <button ahef="StackButton.js">Mint</button>
      </>}
      handleClose={togglePopup}
    />
  </div>
}
export default App;