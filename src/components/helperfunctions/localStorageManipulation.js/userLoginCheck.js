function userPassCheckingAlgo(userDataBase, username, password) {
    const answer = userDataBase.filter((el) => {
        if (el.username === username && el.password === password) {
            return true;
        }
        return false;
    })
    if (answer.length <= 0) {
        return null;
    }
    return answer;
}

export default userPassCheckingAlgo;