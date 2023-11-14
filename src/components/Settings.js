import { useOutletContext } from "react-router-dom";
import { Card } from "semantic-ui-react";

function Settings() {

  const localLogInStatus = localStorage.getItem('isLoggedIn');
  const localUserName = localStorage.getItem('name');
  const localDarkModeValue = JSON.parse(localStorage.getItem('isDark'));

  const [login, logout, userPassCheckingAlgo, userDataBase, setUserDataBase, onHideShowPost, isDark, switchMode, loggedInUsersPostsList] = useOutletContext();
  return (
    <div style={{
      'display': 'flex',
      'flexDirection': 'column',
      'alignItems': 'center',
      'justifyContent': 'center',
      'width': '100%'
    }}>
      <h1 style={{
        'marginTop': '3%'
      }}>{localLogInStatus ? `${localUserName}'s Settings` : 'Welcome to Settings'}</h1>
      <div className='drkmode-btn' style={{
        'display': 'flex',
        'flexDirection': 'row',
        'alignItems': 'center',
        'justifyContent': 'center',
        'width': '100%',
        'marginBottom': '3%'
      }}>
        <label style={{ 'marginRight': '1%' }}>Set Dark/Light Mode:</label>
        <button onClick={() => switchMode()}>{localDarkModeValue === true ? 'LIGHT MODE' : 'DARK MODE'}</button>
      </div>

      {loggedInUsersPostsList ?
        <div className='hiddenPosts' style={{
          'display': 'flex',
          'flexDirection': 'column',
          'alignItems': 'center',
          'justifyContent': 'center'
        }}>
          <h3>HIDDEN POSTS</h3>
          <div>
            <Card.Group style={{
              'display': 'flex',
              'flexDirection': 'column',
              'alignItems': 'center',
              'justifyContent': 'center'
            }}>
              {loggedInUsersPostsList.map((post) => {
                if (post.isHidden) {
                  return (
                    <Card>
                      <Card.Content>
                        <Card.Header>{post.author}</Card.Header>
                        <Card.Description>{`${post.post.substring(0, 20)}...`}</Card.Description>
                        <button style={{'marginTop': '3%'}} className='ui button submit' onClick={() => onHideShowPost(post.id)}>UNHIDE</button>
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