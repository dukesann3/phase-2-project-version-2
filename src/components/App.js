import NavBar from "./NavBar";
import { Outlet, createSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

function App() {

  const [userDataBase, setUserDataBase] = useState(localStorage.getItem('theEntireThing') ? JSON.parse(localStorage.getItem('theEntireThing')) : []);
  const navigate = useNavigate();
  let isDarkRef = useRef();

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
        debugger;
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
    console.log(updatedUserDataBase);
    setUserDataBase(updatedUserDataBase);
  }


  function swapIsHiddenWithLocalValue() {
    /*
      Checks if localStorage has hiddenpost ids scattered around
      If it doesn't, then throw an error.
      If it does, then get the localStorage hidden post ids and JSON.parse it so it can be read.
      Then, map a copy of the current userData and make isHidden to be true for matching post ids
      ..., that's it I guess.
    */

    if (!localStorage.getItem('hiddenPostIds')) {
      throw Error('Local Storage Value \'hidden posts\' Does Not Exist');
    }

    const locallyStoredHiddenPosts = JSON.parse(localStorage.getItem('hiddenPostIds'));
    console.log(locallyStoredHiddenPosts);

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

  //make function that sees whether localStorage login id and actual logged in id in database match...

  return (
    <>
      <header>
        <NavBar logout={logout} />
      </header>
      <Outlet context={[login, logout, userPassCheckingAlgo, isDarkRef, userDataBase, setUserDataBase, onHideShowPost]} />
    </>
  );
}

export default App;
