import { useState } from "react";

function Settings() {

  const localLogInStatus = localStorage.getItem('isLoggedIn');
  const localUserName = localStorage.getItem('name');

  const [isDark, setIsDark] = useState(localStorage.getItem('isDark') ? JSON.parse(localStorage.getItem('isDark')) : false);

  function switchMode() {
    if (!isDark) {
      window.document.body.style.background = 'black';
      window.document.body.style.color = 'white';
      setIsDark(true);
      localStorage.setItem('isDark', true);
    }
    else {
      window.document.body.style.background = 'white';
      window.document.body.style.color = 'black';
      setIsDark(false);
      localStorage.setItem('isDark', false);
    }
    return;
  }

  return (
    <div>
      {localLogInStatus ? `${localUserName}'s Settings` : 'Welcome to Settings'}
      <div className='drkmode-btn'>
        <button onClick={() => switchMode()}>{isDark ? 'LIGHT MODE' : 'DARK MODE'}</button>
      </div>
    </div>
  );
}

export default Settings;