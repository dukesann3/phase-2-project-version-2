import { useState } from "react";
import { Card } from "semantic-ui-react";
import { useOutletContext } from "react-router-dom";
import styles from "../css files/UserPost.css";


function UserPost({ flatpost, setLiked, liked, onHideShow }) {

    const { timestamp, author, post, likes, id, isHidden } = flatpost;
    const [likeCount, setLikeCount] = useState(likes);

    const localUserId = JSON.parse(localStorage.getItem('id'));
    const postId = id;

    const [login, logout, userPassCheckingAlgo, userDataBase, setUserDataBase, onHideShowPost, isDark, switchMode] = useOutletContext();

    function onLike() {
        if (!liked) {
            setLiked(true);
            setLikeCount(likeCount + 1);
        }
        else {
            setLiked(false);
            setLikeCount(likeCount - 1);
        }
    }

    return (
        <>
            {!isHidden ?
                <Card className='post-card' style={!isDark ? {'backgroundColor': 'white'} : {'backgroundColor': 'blue'}}>
                    <Card.Content>
                        <div className='post-content'>
                            <Card.Header className='post-header post-content'>{author}</Card.Header>
                            <Card.Description className='post-content'>{post}</Card.Description>
                            <p className='post-content' onClick={() => onLike()}>LIKES: {likeCount}</p>
                            <p className='post-content'>{timestamp}</p>
                        </div>
                        <button onClick={() => onHideShow(postId, localUserId)}>HIDE?</button>
                    </Card.Content>
                </Card >
                : null
            }
        </>
    )
}

export default UserPost;