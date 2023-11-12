function removeUserFromLocalStore(listOfUserInfo) {
    if (Array.isArray(listOfUserInfo) && typeof listOfUserInfo === 'object') {
        throw new Error('Variable Is Not an Object');
    }
    for (let listItem in listOfUserInfo) {
        localStorage.removeItem(listItem);
    }
}

function addUserToLocalStore(listOfUserInfo) {
    if (Array.isArray(listOfUserInfo) && typeof listOfUserInfo === 'object') {
        throw new Error('Variable Is Not an Object');
    }
    for (let listItem in listOfUserInfo) {
        localStorage.setItem(listItem, listOfUserInfo[listItem])
    }
}

export {removeUserFromLocalStore, addUserToLocalStore};