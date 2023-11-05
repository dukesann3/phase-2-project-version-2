import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('username') ? true: false);
  const navigate = useNavigate();

  function login(name){
      setIsLoggedIn(true);
      navigate(`/UserFeed/${name}`);
  }

  function logout(){
    setIsLoggedIn(false);
    //removes saved local storage items when logged out.
    localStorage.removeItem('username');
    localStorage.removeItem('password');
  }

  return (
    <>
      <header>
        <NavBar isLoggedIn={isLoggedIn}/>
      </header>
      <Outlet context={[isLoggedIn, login, logout]}/>
    </>
  );
}

export default App;
