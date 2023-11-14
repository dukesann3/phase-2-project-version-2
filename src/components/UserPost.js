import { useState } from "react";
import { Card } from "semantic-ui-react";
import { useOutletContext } from "react-router-dom";

function UserPost({ flatpost, setLiked, liked, onHideShow }) {

    const { timestamp, author, post, likes, id, isHidden } = flatpost;
    const [likeCount, setLikeCount] = useState(likes);

    const [login, logout, userPassCheckingAlgo, userDataBase, setUserDataBase, onHideShowPost, isDark, switchMode, loggedInUsersPostsList] = useOutletContext();

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
                <Card style={!isDark ? {
                    'overflow': 'hidden',
                    'width': '65%',
                } : 
                {
                    'overflow': 'hidden',
                    'width': '65%',
                    'backgroundColor': 'blue'
                }}>
                    <Card.Content>
                        <div>
                            <Card.Header style={{
                                'font-weight': 'bold',
                                'font-size': '16px',
                                'margin-bottom': '5px'
                            }}>{author}</Card.Header>
                            <Card.Description style={{ 'margin-bottom': '5px' }}>{post}</Card.Description>
                            <p onClick={() => onLike()} style={{ 'margin-bottom': '5px' }}>LIKES: {likeCount}</p>
                            <p style={{ 'margin-bottom': '5px' }}>{timestamp}</p>
                        </div>
                        <button onClick={() => onHideShow(id)}>HIDE?</button>
                    </Card.Content>
                </Card >
                : null
            }
        </>
    )
}

export default UserPost;