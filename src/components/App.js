import NavBar from "./NavBar";
import { Outlet, createSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "./customHooks/useFetch";
import useDark from "./customHooks/useDark";
import { addUserToLocalStore, removeUserFromLocalStore } from "./helperfunctions/localStorageManipulation.js/addRemoveUserFromLocalStore";
import userPassCheckingAlgo from "./helperfunctions/localStorageManipulation.js/userLoginCheck";

function App() {

  const [userDataBase, setUserDataBase] = useFetch('http://localhost:8000/users');
  const [isDark, setIsDark] = useDark();
  const loggedInUsersPostsList = typeof findUserIdThatIsLoggedIn() === 'number' ? userDataBase[findUserIdThatIsLoggedIn()].posts : null;

  const navigate = useNavigate();
  const localId = parseInt(localStorage.getItem('id'), 10);

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
      .then((response) => {
        if (!response.ok) {
          throw new Error('invalid request');
        }
        return response.json();
      })
      .then((retrievedData) => {
        addUserToLocalStore(retrievedData);
        setUserDataBase(userDataBase.map((user) => {
          if (user.id === id) {
            return retrievedData;
          }
          else {
            return user;
          }
        }));
        navigate(`/UserFeed/${retrievedData.name}`);
      })
      .catch((error) => {
        alert('invalid request');
        console.log(error);
      });
  }

  async function logout(id) {
    const loginJSONChange = JSON.stringify({
      isLoggedIn: false
    });
    return await fetch(`http://localhost:8000/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: loginJSONChange
    })
      .then(response => response.json())
      .then((retrievedData) => {
        removeUserFromLocalStore(retrievedData);
        setUserDataBase(userDataBase.map((user) => {
          if (user.id === id) {
            return retrievedData;
          }
          else {
            return user;
          }
        }));
      })
      .catch((error) => {
        throw Error(error);
      });
  }

  function onHideShowPost(idHideShow) {
    let updatedUserDataBase = [...userDataBase];
    updatedUserDataBase.forEach((user) => {
      if (user.id === localId) {
        user.posts.forEach((post) => {
          if (post.id === idHideShow) {
            post.isHidden = !post.isHidden;
          }
        })
      }
    });
    setUserDataBase(updatedUserDataBase);
    const stringifiedUpdatedUserDataBase = JSON.stringify(updatedUserDataBase);
    localStorage.setItem('theEntireThing', stringifiedUpdatedUserDataBase);
  }

/*
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

  */

  function switchMode() {

    if (!localStorage.getItem('isDark')) {
      localStorage.setItem('isDark', false);
    }

    if (isDark === true) {
      setIsDark(false);
      localStorage.setItem('isDark', false);
      window.document.body.style.background = 'white';
      window.document.body.style.color = 'black';
    }
    else {
      setIsDark(true);
      localStorage.setItem('isDark', true);
      window.document.body.style.background = 'black';
      window.document.body.style.color = 'white';
    }
    return;
  }

  function findUserIdThatIsLoggedIn() {
    if (!userDataBase) {
      return null;
    }

    const allUsersThatAreLoggedIn = userDataBase.filter((user) => {
      if (user.isLoggedIn) {
        return true;
      }
      else {
        return false;
      }
    });

    if (allUsersThatAreLoggedIn.length > 1 || allUsersThatAreLoggedIn.length === 0) {
      return false;
    }
    return allUsersThatAreLoggedIn[0].id - 1
  }

  return (
    <>
      <header>
        <NavBar logout={logout} userDataBase={userDataBase} findUserIdThatIsLoggedIn={findUserIdThatIsLoggedIn} />
      </header>
      <Outlet context={[login, logout, userPassCheckingAlgo, userDataBase, setUserDataBase, onHideShowPost, isDark, switchMode, loggedInUsersPostsList]} />
    </>
  );
}

export default App;
