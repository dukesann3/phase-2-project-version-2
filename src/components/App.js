import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {

  //sees if user is logged in. If localStorage contains username and password, then user is logged in.
  //login status of user is only a reflection of what is shown in the database.
  //I would like to know who (id) is loggedin as well.
  const [isLoggedIn, setIsLoggedIn] = useState((localStorage.getItem('username') && localStorage.getItem('password')) ? true : false);

  //NOTE, THIS IS USER DATABASE ON LOCAL BROWSER. NORMALLY, IT SHOULD BE ON A SERVER?
  //BUT, THIS SHOULD ACCOMODATE FOR PHASE 2.
  const [userDataBase, setUserDataBase] = useState([]);

  //want to run useEffect every time userDataBase is updated.
  useEffect(() => {
    fetch(`http://localhost:8000/users`)
      .then(response => response.json())
      .then((userList) => {
        setUserDataBase(userList);
      })
  }, []);

  const navigate = useNavigate();

  //user logs in. Sends patch request to set isLoggedIn value to be true.
  async function login(id) {
    const loginJSONChange = JSON.stringify({
      isLoggedIn: true
    });
    return await fetch(`http://localhost:8000/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: loginJSONChange
    })
      .then(response => response.json())
      .then((patchedData) => {
        //sets isLoggedIn to be true
        setIsLoggedIn(true);
        localStorage.setItem('username', patchedData.username);
        localStorage.setItem('password', patchedData.password);
        navigate(`/UserFeed/${patchedData.name}`);
      })
      .catch((error) => {
        throw Error(error);
      })
  }

  function logout() {
    const loginJSONChange = JSON.stringify({
      isLoggedIn: false
    });

    setIsLoggedIn(false);
    //removes saved local storage items when logged out.
    localStorage.removeItem('username');
    localStorage.removeItem('password');
  }

  return (
    <>
      <header>
        <NavBar isLoggedIn={isLoggedIn} />
      </header>
      <Outlet context={[isLoggedIn, login, logout]} />
    </>
  );
}

export default App;
