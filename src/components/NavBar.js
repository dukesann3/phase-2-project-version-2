import { NavLink } from "react-router-dom";

function NavBar({ logout, userDataBase, findUserIdThatIsLoggedIn, isDark }) {

  const localUserName = localStorage.getItem('name');
  const userIdThatIsLoggedIn = findUserIdThatIsLoggedIn();

  function displayNavBar() {

    if (typeof userIdThatIsLoggedIn !== 'number') {
      return (
        <div className='ui secondary pointing menu'>
          <NavLink to='/' className='active item' style={!isDark ? {'color': 'black'} : {'color': 'white'}}>HOME</NavLink>
          <NavLink to='/Settings' className='item' style={!isDark ? {'color': 'black'} : {'color': 'white'}}>SETTINGS</NavLink>
          <div class="right menu">
            <NavLink to='/Login' className='ui item' style={!isDark ? {'color': 'black'} : {'color': 'white'}}>LOGIN</NavLink>
          </div>
        </div >
      );
    }
    else {
      return (
        <div className='ui secondary pointing menu'>
          <NavLink to='/' className='active item' style={!isDark ? {'color': 'black'} : {'color': 'white'}}>HOME</NavLink>
          <NavLink to={`/UserFeed/${localUserName}`} className='item' style={!isDark ? {'color': 'black'} : {'color': 'white'}}>USERFEED</NavLink>
          <NavLink to='/Settings' className='item' style={!isDark ? {'color': 'black'} : {'color': 'white'}}>SETTINGS</NavLink>
          <div class="right menu">
            <NavLink to='/Login' onClick={() => logout(userIdThatIsLoggedIn + 1)} className='ui item' style={!isDark ? {'color': 'black'} : {'color': 'white'}}>LOGOUT</NavLink>
          </div>
        </div>
      );
    }
  }

  return (
    displayNavBar()
  );
}

export default NavBar;


