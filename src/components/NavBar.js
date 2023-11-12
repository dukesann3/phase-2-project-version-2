import { NavLink } from "react-router-dom";

function NavBar({logout}) {

  const localLogInStatus = JSON.parse(localStorage.getItem('isLoggedIn'));
  const localUserName = localStorage.getItem('name');
  const localId = JSON.parse(localStorage.getItem('id'));

    function displayNavBar(){
        if(!localLogInStatus){
            return (
                <>
                  <NavLink to='/'>HOME</NavLink>
                  <NavLink to='/Login'>LOGIN</NavLink>
                  <NavLink to='/Settings'>SETTINGS</NavLink>
                </>
              );
        }
        else{
            return (
                <>
                  <NavLink to='/'>HOME</NavLink>
                  <NavLink to={`/UserFeed/${localUserName}`}>USER</NavLink>
                  <NavLink to='/Settings'>SETTINGS</NavLink>
                  <NavLink to='/Login' onClick={() => logout(localId)}>LOGOUT</NavLink>
                </>
              );
        }
    }

    return (
        displayNavBar()
    );
  }
  
  export default NavBar;