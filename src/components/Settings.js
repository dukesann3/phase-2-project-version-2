import { useOutletContext } from "react-router-dom";

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
        'width': '100%'
      }}>
        <label style={{'marginRight': '1%'}}>Set Dark/Light Mode:</label>
        <button onClick={() => switchMode()}>{localDarkModeValue === true ? 'LIGHT MODE' : 'DARK MODE'}</button>
      </div>

      {loggedInUsersPostsList ?
        <div className='hiddenPosts'>
          <h3>HIDDEN POSTS</h3>
          <div>
            <ul>
              {loggedInUsersPostsList.map((post) => {
                if (post.isHidden) {
                  return (
                    <div>
                      <p>{post.author}</p>
                      <article>{post.post.substring(0, 20)}</article>
                      <button onClick={() => onHideShowPost(post.id)}>UNHIDE</button>
                    </div>
                  )
                }
              })}
            </ul>
          </div>
        </div>
        : null
      }
    </div >
  );
}

export default Settings;