import { useOutletContext } from "react-router-dom";
import { useState } from "react";

function Settings() {

  const [login, logout, userPassCheckingAlgo, isDarkRef, userDataBase, setUserDataBase, onHideShowPost] = useOutletContext();
  const localLogInStatus = localStorage.getItem('isLoggedIn');
  const localUserName = localStorage.getItem('name');

  function switchMode() {
    if (!isDarkRef.current) {
      window.document.body.style.background = 'black';
      window.document.body.style.color = 'white';
      isDarkRef.current = true;
    }
    else {
      window.document.body.style.background = 'white';
      window.document.body.style.color = 'black';
      isDarkRef.current = false;
    }
    return;
  }

  return (
    <div>
      {localLogInStatus ? `${localUserName}'s Settings` : 'Welcome to Settings'}
      <div className='drkmode-btn'>
        <button onClick={() => switchMode()}>{isDarkRef ? 'LIGHT MODE' : 'DARK MODE'}</button>
      </div>
    </div>
  );
}

export default Settings;