import { NavLink } from "react-router-dom";

function NavBar({loggedInUserData, logout}) {

  const {name, isLoggedIn, id} = loggedInUserData;

    function displayNavBar(){
        if(!isLoggedIn){
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
                  <NavLink to={`/UserFeed/${name}`}>USER</NavLink>
                  <NavLink to='/Settings'>SETTINGS</NavLink>
                  <NavLink to='/Login' onClick={() => logout(id)}>LOGOUT</NavLink>
                </>
              );
        }
    }

    return (
        displayNavBar()
    );
  }
  
  export default NavBar;