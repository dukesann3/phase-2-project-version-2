import { useState, useEffect } from "react";

const useFetch = (url) => {

    const [userDataBase, setUserDataBase] = useState(localStorage.getItem('theEntireThing') ? JSON.parse(localStorage.getItem('theEntireThing')) : []);

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

      return [userDataBase, setUserDataBase];

}

export default useFetch;