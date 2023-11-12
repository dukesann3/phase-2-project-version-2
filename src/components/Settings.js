import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

function Settings() {

  //seems like locally stored values respond better when it is directly used in JSX.
  //response is very bad when it comes to using it in JSX functions within a parent JSX function. It is different.

  const localLogInStatus = localStorage.getItem('isLoggedIn');
  const localUserName = localStorage.getItem('name');
  const localDarkModeValue = JSON.parse(localStorage.getItem('isDark'));
  const locallyStoredHiddenPostIds = JSON.parse(localStorage.getItem('hiddenPostIds'));

  const [login, logout, userPassCheckingAlgo, userDataBase, setUserDataBase, onHideShowPost, isDark, switchMode, loggedInUsersPostsList] = useOutletContext();
  debugger;
  return (
    <div>
      {localLogInStatus ? `${localUserName}'s Settings` : 'Welcome to Settings'}
      <div className='drkmode-btn'>
        <button onClick={() => switchMode()}>{localDarkModeValue === true ? 'LIGHT MODE' : 'DARK MODE'}</button>
      </div>

      {loggedInUsersPostsList ?
        <div className='hiddenPosts'>
          <h3>HIDDEN POSTS</h3>
          <div>
            <ul>
              {loggedInUsersPostsList.map((post) => {
                if (post.isHidden) {
                  return <li>{post.author}</li>
                }
              })}
            </ul>
          </div>
        </div>
        : null}
    </div>
  );
}

export default Settings;