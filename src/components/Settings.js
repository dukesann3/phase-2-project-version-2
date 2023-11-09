import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import { useRef } from "react";

function Settings() {

  const [loggedInUserData, setIsDark, isDark] = useOutletContext();
  const { id, name, isLoggedIn } = loggedInUserData;

  //btn that makes brwoser screen light or dark
  function switchMode() {
    if (!isDark) {
      window.document.body.style.background = 'black';
      window.document.body.style.color = 'white';
      setIsDark(true);
    }
    else {
      window.document.body.style.background = 'white';
      window.document.body.style.color = 'black';
      setIsDark(false);
    }
    return;
  }

  //displays user's friends to block...
  //this is JSX only found when user is loggedin

  return (
    <div>
      {isLoggedIn ? `${name}'s Settings` : 'Welcome to Settings'}
      <div className='drkmode-btn'>
        <button onClick={switchMode()}>{isDark ? 'LIGHT MODE' : 'DARK MODE'}</button>
      </div>
    </div>
  );
}

export default Settings;