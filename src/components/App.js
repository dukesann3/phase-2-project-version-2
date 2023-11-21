import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useFetch from "./customHooks/useFetch";
import useDark from "./customHooks/useDark";
import { addUserToLocalStore, removeUserFromLocalStore } from "./helperfunctions/localStorageManipulation.js/addRemoveUserFromLocalStore";
import userLoginVerifier from "./helperfunctions/localStorageManipulation.js/userLoginCheck";
import { useEffect } from "react";


function App() {

  const navigate = useNavigate();

  const [userDataBase, setUserDataBase] = useFetch('http://localhost:8000/users');
  const [isDark, setIsDark] = useDark();

  useEffect(()=>{
    localStorage.setItem('theEntireThing', JSON.stringify(userDataBase));
  },[login,logout])

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
        localStorage.removeItem('scrollendQty');
      })
      .catch((error) => {
        throw Error(error);
      });
  }

  function onHideShowPost(postId, userId) {
    let updatedUserDataBase = [...userDataBase];
    updatedUserDataBase.forEach((user) => {
      if (user.id === userId) {
        user.posts.forEach((post) => {
          if (post.id === postId) {
            post.isHidden = !post.isHidden;
          }
        })
      }
    });
    setUserDataBase(updatedUserDataBase);
    const stringifiedUpdatedUserDataBase = JSON.stringify(updatedUserDataBase);
    localStorage.setItem('theEntireThing', stringifiedUpdatedUserDataBase);
  }

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

  return (
    <>
      <header>
        <NavBar logout={logout} isDark={isDark}/>
      </header>
      <Outlet context={[login, logout, userLoginVerifier, userDataBase, setUserDataBase, onHideShowPost, isDark, switchMode]} />
    </>
  );
}

export default App;
