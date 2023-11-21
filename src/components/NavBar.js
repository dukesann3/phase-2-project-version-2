import { NavLink } from "react-router-dom";

function NavBar({ logout, isDark }) {

  const localUserName = localStorage.getItem('name');
  const userIdWhoIsLoggedIn = JSON.parse(localStorage.getItem('id'));

  function displayNavBar() {

    if (typeof userIdWhoIsLoggedIn !== 'number') {
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
            <NavLink to='/Login' onClick={() => logout(userIdWhoIsLoggedIn)} className='ui item' style={!isDark ? {'color': 'black'} : {'color': 'white'}}>LOGOUT</NavLink>
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


