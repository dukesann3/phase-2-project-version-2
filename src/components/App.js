import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function login(){
    setIsLoggedIn(true);
  }

  function logout(){
    setIsLoggedIn(false);
  }

  return (
    <>
      <header>
        <NavBar isLoggedIn={isLoggedIn}/>
      </header>
      <Outlet context={[isLoggedIn, login]}/>
    </>
  );
}

export default App;
