import { useState } from "react";
import { Card } from "semantic-ui-react";

function UserPost({ flatpost, setLiked, liked, onHideShow }) {

    const { timestamp, author, post, likes, id, isHidden } = flatpost;
    const [likeCount, setLikeCount] = useState(likes);

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
        <Card style={{
            'overflow': 'hidden',
            'width': '65%'
        }}>
            <Card.Content>
                {!isHidden ?
                    <div>
                        <Card.Header style={{
                            'font-weight': 'bold',
                            'font-size': '16px',
                            'margin-bottom': '5px'
                            }}>{author}</Card.Header>
                        <Card.Description style={{'margin-bottom': '5px'}}>{post}</Card.Description>
                        <p onClick={() => onLike()} style={{'margin-bottom': '5px'}}>LIKES: {likeCount}</p>
                        <p style={{'margin-bottom': '5px'}}>{timestamp}</p>
                    </div>
                    : null}
                <button onClick={() => onHideShow(id)}>HIDE?</button>
            </Card.Content>
        </Card>
    )
}

export default UserPost;