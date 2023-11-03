import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <header>
        <NavBar isLoggedIn={isLoggedIn}/>
      </header>
      <Outlet context={[isLoggedIn, setIsLoggedIn]}/>
    </>
  );
}

export default App;
