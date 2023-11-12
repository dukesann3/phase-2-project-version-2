import { useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import UserPost from "./UserPost";


function UserFeed() {

  const { username } = useParams();
  const [login, logout, userPassCheckingAlgo, userDataBase, setUserDataBase, onHideShowPost] = useOutletContext();

  const localId = parseInt(localStorage.getItem('id'),10);

  const [scrollendQty, setScrollendQty] = useState(1);
  const [liked, setLiked] = useState(false);

  const maxPostsShownAtOnce = 10;

  const postsShownAtATime = userDataBase[localId-1].posts ? userDataBase[localId - 1].posts.filter((post, index) => {
    if (maxPostsShownAtOnce * scrollendQty >= index) {
      return true;
    }
  }) : null

  function whenScrollEnds() {
    //normally it is another get request, but this is without a backend.
    setScrollendQty(scrollendQty + 1);
  }

  window.addEventListener('scroll', () => {
    let body = document.body;
    let html = document.documentElement;
    let height = (body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight);
    if (window.pageYOffset >= height - 580) {
      whenScrollEnds();
    }
  });

  return (
    <div>
      <h1>{`${username}'s page`}</h1>
      <div>
        {postsShownAtATime ? postsShownAtATime.map((post) => {
          return <UserPost key={post.id} flatpost={post} setLiked={setLiked} liked={liked} onHideShow={onHideShowPost} />
        }) : <h2>Loading...</h2>}
      </div>
    </div>
  );
}

export default UserFeed;

