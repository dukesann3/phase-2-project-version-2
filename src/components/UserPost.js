
function UserPost({flatpost}){

    const {timestamp, author, post} = flatpost

    return(
        <div>
            <h3>{author}</h3>
            <p>{post}</p>
            <p>{timestamp}</p>
        </div>
    )
}

export default UserPost;