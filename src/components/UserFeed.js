import { useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import UserPost from "./UserPost";
import { Card } from "semantic-ui-react";
import "../css files/UserFeed.css"

function UserFeed() {

  const { username } = useParams();
  const [login, logout, userPassCheckingAlgo, userDataBase, setUserDataBase, onHideShowPost] = useOutletContext();

  const localId = parseInt(localStorage.getItem('id'),10);

  const [scrollendQty, setScrollendQty] = useState(JSON.parse(localStorage.getItem('scrollendQty')) || 1);
  const [liked, setLiked] = useState(false);

  useEffect(()=>{
    localStorage.setItem('scrollendQty', JSON.stringify(scrollendQty));
  },[scrollendQty])

  const maxPostsShownAtOnce = 10;
  const postsShownAtATime = userDataBase[localId-1].posts ? userDataBase[localId - 1].posts.filter((post, index) => {
    if (maxPostsShownAtOnce * scrollendQty >= index) {
      return true;
    }
  }) : null

  function whenScrollEnds() {
    setScrollendQty(scrollendQty + 1);
  }

  window.addEventListener('scroll', () => {
    let body = document.body;
    let html = document.documentElement;
    let height = Math.max(body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight);
    console.log([window.innerHeight, window.pageYOffset, height])
    if (window.pageYOffset >= height-645) {
      whenScrollEnds();
    }
  });

  return (
    <div className='post-list-container post-max-width'>
      <h1>{`${username}'s page`}</h1>
      <Card.Group className='post-list-container post-group'>
        {postsShownAtATime ? postsShownAtATime.map((post) => {
          return <UserPost key={post.id} flatpost={post} setLiked={setLiked} liked={liked} onHideShow={onHideShowPost} />
        }) : <h2>Loading...</h2>}
      </Card.Group>
    </div>
  );
}

export default UserFeed;

