function userLoginVerifier(userDataBase, username, password) {
    const user = userDataBase.filter((el) => {
        if (el.username === username && el.password === password) {
            return true;
        }
        return false;
    })
    if (user.length <= 0) {
        return null;
    }
    return user;
}

export default userLoginVerifier;