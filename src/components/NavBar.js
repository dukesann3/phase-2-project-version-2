import { NavLink } from "react-router-dom";

function NavBar({isLoggedIn}) {

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
                  <NavLink to='/UserFeed'>USER</NavLink>
                  <NavLink to='/Settings'>SETTINGS</NavLink>
                </>
              );
        }
    }

    return (
        displayNavBar()
    );
  }
  
  export default NavBar;