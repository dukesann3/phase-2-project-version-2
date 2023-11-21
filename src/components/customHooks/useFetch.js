import { useState, useEffect } from "react";

//one time deal here.


const useFetch = (url) => {

    const [userDataBase, setUserDataBase] = useState(JSON.parse(localStorage.getItem('theEntireThing')) || []);

    useEffect(() => {
        if (!localStorage.getItem('theEntireThing')) {
          fetch(url)
            .then(response => response.json())
            .then((userList) => {
              setUserDataBase(userList);
              const stringifiedUserList = JSON.stringify(userDataBase);
              localStorage.setItem('theEntireThing', stringifiedUserList);
            })
        }
      }, []);

      return [userDataBase, setUserDataBase];

}

export default useFetch;