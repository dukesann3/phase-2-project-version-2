import { useOutletContext } from "react-router-dom";
import { Card } from "semantic-ui-react";
import "../css files/Settings.css";

function Settings() {

  const localLogInStatus = localStorage.getItem('isLoggedIn');
  const localUserName = localStorage.getItem('name');
  const localDarkModeValue = JSON.parse(localStorage.getItem('isDark'));
  const localUserId = JSON.parse(localStorage.getItem('id'));
  const localStorageForAllData = JSON.parse(localStorage.getItem('theEntireThing'));
  const localPostList = localLogInStatus ? localStorageForAllData[localUserId-1].posts : null;

  const [login, logout, userPassCheckingAlgo, userDataBase, setUserDataBase, onHideShowPost, isDark, switchMode] = useOutletContext();

  return (
    <div className='display-column full-width'>
      <h1 style={{
        'marginTop': '3%'
      }}>{localLogInStatus ? `${localUserName}'s Settings` : 'Welcome to Settings'}</h1>
      <div className='drkmode-btn'>
        <label>Set Dark/Light Mode:</label>
        <button onClick={() => switchMode()}>{localDarkModeValue === true ? 'LIGHT MODE' : 'DARK MODE'}</button>
      </div>

      {localLogInStatus ?
        <div className='display-column'>
          <h3>HIDDEN POSTS</h3>
          <div>
            <Card.Group className='display-column'>
              {localPostList.map((post) => {
                if (post.isHidden) {
                  return (
                    <Card>
                      <Card.Content>
                        <Card.Header>{post.author}</Card.Header>
                        <Card.Description>{`${post.post.substring(0, 20)}...`}</Card.Description>
                        <button className='ui button submit hide-button' onClick={() => onHideShowPost(post.id, localUserId)}>UNHIDE</button>
                      </Card.Content>
                    </Card>
                  )
                }
              })}
            </Card.Group>
          </div>
        </div>
        : null
      }
    </div >
  );
}

export default Settings;