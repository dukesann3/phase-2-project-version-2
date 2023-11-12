import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

function Settings() {

  const localLogInStatus = localStorage.getItem('isLoggedIn');
  const localUserName = localStorage.getItem('name');
  const localDarkModeValue = JSON.parse(localStorage.getItem('isDark'));

  const [login, logout, userPassCheckingAlgo, userDataBase, setUserDataBase, onHideShowPost, isDark, switchMode] = useOutletContext();

  return (
    <div>
      {localLogInStatus ? `${localUserName}'s Settings` : 'Welcome to Settings'}
      <div className='drkmode-btn'>
        <button onClick={() => switchMode()}>{localDarkModeValue === false ? 'LIGHT MODE' : 'DARK MODE'}</button>
      </div>
    </div>
  );
}

export default Settings;