import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('username') ? true: false);
  const navigate = useNavigate();

  function login(){

    fetch('http://localhost:8000/users')
    .then(response => response.json())
    .then((data) => {
      setIsLoggedIn(true);
      navigate(`/UserFeed/${data[0].name}`);
    });

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
