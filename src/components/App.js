import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {

  //sees if user is logged in. If localStorage contains username and password, then user is logged in.
  //login status of user is only a reflection of what is shown in the database.
  //I would like to know who (id) is loggedin as well.
  const [loggedInUserData, setLoggedInUserData] = useState((localStorage.getItem('id') && localStorage.getItem('isLoggedIn')) ?
    {
      id: localStorage.getItem('id'),
      isLoggedIn: localStorage.getItem('isLoggedIn')
    } :
    {
      id: null,
      isLoggedIn: false
    });

  //NOTE, THIS IS USER DATABASE ON LOCAL BROWSER. NORMALLY, IT SHOULD BE ON A SERVER?
  //BUT, THIS SHOULD ACCOMODATE FOR PHASE 2.
  const [userDataBase, setUserDataBase] = useState([]);

  //want to run useEffect every time userDataBase is updated.
  useEffect(() => {
    fetch(`http://localhost:8000/users`)
      .then(response => response.json())
      .then((userList) => {
        setUserDataBase(userList);
        console.log('did it run after a route change?')
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
        //sets logged in user's information here.
        setLoggedInUserData({
          id: patchedData.id,
          isLoggedIn: patchedData.isLoggedIn
        });
        //stores user information in localstorage in case browser refreshes and useState value is lost completely.
        localStorage.setItem('username', patchedData.username);
        localStorage.setItem('password', patchedData.password);
        localStorage.setItem('id', patchedData.id);
        localStorage.setItem('isLoggedIn', true)
        navigate(`/UserFeed/${patchedData.name}`);
      })
      .catch((error) => {
        alert('invalid request');
        throw Error(error);
      });
  }

  async function logout() {
    const loginJSONChange = JSON.stringify({
      isLoggedIn: false
    });
    return await fetch(`http://localhost:8000/users/${loggedInUserData.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: loginJSONChange
    })
      .then(response => response.json())
      .then(() => {
        //sets logged in user's information here.
        setLoggedInUserData({
          id: null,
          isLoggedIn: false
        });
        //removes locally stored user information here
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        localStorage.removeItem('id');
        localStorage.removeItem('isLoggedIn');
      })
      .catch((error) => {
        throw Error(error);
      });
  }

  //checks database to see if username or password match.
  function userPassCheckingAlgo(username, password) {
    const answer = userDataBase.filter((el) => {
      if (el.username === username && el.password === password) {
        return true;
      }
      return false;
    })
    if (answer.length <= 0) {
      return null;
    }
    return answer;
  }

  return (
    <>
      <header>
        <NavBar isLoggedIn={loggedInUserData.isLoggedIn} />
      </header>
      <Outlet context={[loggedInUserData, login, logout, userPassCheckingAlgo]} />
    </>
  );
}

export default App;
