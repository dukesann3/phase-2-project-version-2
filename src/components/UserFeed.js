import { useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import UserPost from "./UserPost";
import { Card } from "semantic-ui-react";


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
    <div className='postListContainter' style={{
      'display': 'flex',
      'flexDirection': 'column',
      'alignItems': 'center'
    }}>
      <h1 style={{
        'margin-top': '3%'
      }}>{`${username}'s page`}</h1>
      <Card.Group style={{
        'width': '100%',
        'display': 'flex',
        'flexDirection': 'column',
        'alignItems': 'center',
        'margin-top': '1%'
        }}>
        {postsShownAtATime ? postsShownAtATime.map((post) => {
          return <UserPost key={post.id} flatpost={post} setLiked={setLiked} liked={liked} onHideShow={onHideShowPost} />
        }) : <h2>Loading...</h2>}
      </Card.Group>
    </div>
  );
}

export default UserFeed;

