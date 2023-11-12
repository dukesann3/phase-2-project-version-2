import { NavLink } from "react-router-dom";

function NavBar({logout, userDataBase, findUserIdThatIsLoggedIn}) {

  const localUserName = localStorage.getItem('name');
  const userIdThatIsLoggedIn = findUserIdThatIsLoggedIn();

    function displayNavBar(){

        if(typeof userIdThatIsLoggedIn !== 'number'){
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
                  <NavLink to={`/UserFeed/${localUserName}`}>USERFEED</NavLink>
                  <NavLink to='/Settings'>SETTINGS</NavLink>
                  <NavLink to='/Login' onClick={() => logout(userIdThatIsLoggedIn+1)}>LOGOUT</NavLink>
                </>
              );
        }
    }

    return (
        displayNavBar()
    );
  }
  
  export default NavBar;