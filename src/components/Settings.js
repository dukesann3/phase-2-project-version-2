import { useOutletContext } from "react-router-dom";
import { useState } from "react";

function Settings() {

  const [loggedInUserData, login, logout, userPassCheckingAlgo, isDarkRef] = useOutletContext();
  const { id, name, isLoggedIn } = loggedInUserData;

  const [isDark, setIsDark] = useState(isDarkRef ? isDarkRef.current : false);
  console.log(isDarkRef.current);

  //btn that makes brwoser screen light or dark
  function switchMode() {
    if (!isDark) {
      console.log('not updating?')
      window.document.body.style.background = 'black';
      window.document.body.style.color = 'white';
      isDarkRef.current = true;
      setIsDark(true);
    }
    else {
      window.document.body.style.background = 'white';
      window.document.body.style.color = 'black';
      isDarkRef.current = false;
      setIsDark(false);
    }
    return;
  }

  /*
  function getIsDarkCookieValue() {
    //try using cookies to store isDark information
    const allCookies = document.cookie;
    //gives back [isDark=value]
    const cookieArray = allCookies.split(';');
    const isDarkCookie = cookieArray.find((el) => {
      if(el.includes('isDark')){
        return true;
      }
    })
    const splitString = isDarkCookie.split('=');
    const isDarkValue = splitString.find((el) => {
      if(el === 'isDark'){
        return false;
      }
      return true;
    })
    console.log(isDarkValue)
    return isDarkValue;
  }
  */

  //displays user's friends to block...
  //this is JSX only found when user is loggedin

  return (
    <div>
      {isLoggedIn ? `${name}'s Settings` : 'Welcome to Settings'}
      <div className='drkmode-btn'>
        <button onClick={() => switchMode()}>{isDark ? 'LIGHT MODE' : 'DARK MODE'}</button>
      </div>
    </div>
  );
}

export default Settings;