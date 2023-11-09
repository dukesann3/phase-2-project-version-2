import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import UserPost from "./UserPost";

function UserFeed() {

  const { username } = useParams();

  const [loggedInUserData] = useOutletContext();
  const { isLoggedIn, id } = loggedInUserData;

  const [userPosts, setUserPosts] = useState([]);
  const [scrollendQty, setScrollendQty] = useState(1);

  const maxPostsShownAtOnce = 10;
  //postsShownAtATime will increase by 10 when user scrolls to an end.
  const postsShownAtATime = userPosts.filter((post,index) => {
    if(maxPostsShownAtOnce*scrollendQty >= index){
      return true;
    }
  })

  useEffect(() => {
    if (isLoggedIn) {
      fetch(`http://localhost:8000/users/${id}`)
        .then(response => response.json())
        .then((fetchedData) => {
          const { posts } = fetchedData;
          setUserPosts(posts);
        })
    }
  }, []);

  function whenScrollEnds(){
    //normally it is another get request, but this is without a backend.
    setScrollendQty(scrollendQty+1);
  }

  window.addEventListener('scrollend', () => {
    console.log('scrollended');
    whenScrollEnds();
  })


  return (
    <div>
      <h1>{`${username}'s page`}</h1>
      <div>
        {userPosts ? postsShownAtATime.map((post) => {
          return <UserPost key={post.id} flatpost={post} />
        }) : <h2>Loading...</h2>}
      </div>
    </div>
  );
}

export default UserFeed;




//add functionality to posts that are shown at once.
/*
function onChangeScroll(){
  ref = window.pageYOffset;
  console.log(ref);
}

window.addEventListener('scroll', () => {
  onChangeScroll();
})
*/