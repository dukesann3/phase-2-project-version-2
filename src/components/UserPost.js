
function UserPost({flatpost}){

    const {timestamp, author, post, isHidden, likes} = flatpost

    return(
        <div>
            <h3>{author}</h3>
            <p>{post}</p>
            <p>LIKES: {likes}</p>
            <p>{timestamp}</p>
        </div>
    )
}

export default UserPost;