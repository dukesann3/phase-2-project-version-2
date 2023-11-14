import { useState } from "react";

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
        <div>
            {!isHidden ? <div className='postWithoutBtn'>
                <h3>{author}</h3>
                <p>{post}</p>
                <p onClick={() => onLike()}>LIKES: {likeCount}</p>
                <p>{timestamp}</p>
            </div> : null}
            <button onClick={() => onHideShow(id)}>HIDE?</button>
        </div>
    )
}

export default UserPost;