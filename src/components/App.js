import NavBar from "./NavBar";
import { Outlet, createSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {

  const [userDataBase, setUserDataBase] = useState(localStorage.getItem('theEntireThing') ? JSON.parse(localStorage.getItem('theEntireThing')) : []);
  const navigate = useNavigate();

  let hiddenPostsList = localStorage.getItem('hiddenPostIds') ? JSON.parse(localStorage.getItem('hiddenPostIds')) : [];
  const localId = parseInt(localStorage.getItem('id'), 10);

  useEffect(() => {
    if (!localStorage.getItem('theEntireThing')) {
      fetch(`http://localhost:8000/users`)
        .then(response => response.json())
        .then((userList) => {
          userList.forEach((user) => {
            const { posts } = user;
            for (let post of posts) {
              post.isHidden = false;
            }
          })
          setUserDataBase(userList);
          const copyOfUserList = [...userList];
          const stringOfCopyOfUserList = JSON.stringify(copyOfUserList);
          localStorage.setItem('theEntireThing', stringOfCopyOfUserList);
        })
    }
  }, []);


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
            if (post.isHidden) {
              hiddenPostsList.push(post.id);
              const hiddenPostString = JSON.stringify(hiddenPostsList);
              localStorage.setItem('hiddenPostIds', hiddenPostString);
            }
            else {
              hiddenPostsList = hiddenPostsList.filter(id => id !== idHideShow);
              const hiddenPostString = JSON.stringify(hiddenPostsList);
              localStorage.setItem('hiddenPostIds', hiddenPostString);
            }
          }
        })
      }
    });
    setUserDataBase(updatedUserDataBase);
    const stringifiedUpdatedUserDataBase = JSON.stringify(updatedUserDataBase);
    localStorage.setItem('theEntireThing', stringifiedUpdatedUserDataBase);
  }

  function removeUserFromLocalStore(listOfUserInfo) {
    if (Array.isArray(listOfUserInfo) && typeof listOfUserInfo === 'object') {
      throw new Error('Variable Is Not an Object');
    }
    for (let listItem in listOfUserInfo) {
      localStorage.removeItem(listItem);
    }
  }

  function addUserToLocalStore(listOfUserInfo) {
    if (Array.isArray(listOfUserInfo) && typeof listOfUserInfo === 'object') {
      throw new Error('Variable Is Not an Object');
    }
    for (let listItem in listOfUserInfo) {
      localStorage.setItem(listItem, listOfUserInfo[listItem])
    }
  }

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
        <NavBar logout={logout} />
      </header>
      <Outlet context={[login, logout, userPassCheckingAlgo, userDataBase, setUserDataBase, onHideShowPost]} />
    </>
  );
}

export default App;
