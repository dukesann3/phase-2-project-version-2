import { NavLink } from "react-router-dom";

function NavBar({logout, userDataBase, findUserIdThatIsLoggedIn}) {

  const localUserName = localStorage.getItem('name');
  const localId = JSON.parse(localStorage.getItem('id'));
  const userIdThatIsLoggedIn = findUserIdThatIsLoggedIn();

    function displayNavBar(){

        if(!userIdThatIsLoggedIn){
          debugger;
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
                  <NavLink to='/Login' onClick={() => logout(userIdThatIsLoggedIn)}>LOGOUT</NavLink>
                </>
              );
        }
    }

    return (
        displayNavBar()
    );
  }
  
  export default NavBar;