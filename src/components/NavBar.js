import { NavLink } from "react-router-dom";

function NavBar({loggedInUserData}) {

  const {name, isLoggedIn} = loggedInUserData;

    function displayNavBar(){
        if(!isLoggedIn){
            return (
                <>
                  <NavLink to='/'>HOME</NavLink>
                  <NavLink to='/Login'>LOGIN</NavLink>
                  <NavLink to='/Settings'>SETTINGS</NavLink>
                  LOGGEDOUT
                </>
              );
        }
        else{
            return (
                <>
                  <NavLink to='/'>HOME</NavLink>
                  <NavLink to={`/UserFeed/${name}`}>USER</NavLink>
                  <NavLink to='/Settings'>SETTINGS</NavLink>
                  LOGGEDIN
                </>
              );
        }
    }

    return (
        displayNavBar()
    );
  }
  
  export default NavBar;