
#FLAT SOCIAL

FlatSocial is a social media website that allows users to upload posts about whatever is on their mind.

##FEATURES

* disclaimer: This App does not have the functionality of POSTing new posts due to json-server limitations

1. User is able to login to his/her personal App
2. Before login, NavBar does not include UserFeed route because there is no user.
3. In Settings (when logged out), user is able to switch between dark mode and light mode. The dark state will be saved even if the user reloads the page.
4. In Login, when user types in the incorrect credentials (username and password), he/she will get an error message for ~3 seconds
5. When login is successful, it navigate the user to the UserFeed. There, user will be able to see the different posts.
6. When scrolling down posts, more posts will load as user gets down to the bottom of the screen until all posts are exhausted.
7. When hide button is clicked from the post, the post immediately disappears. 
8. Hidden posts will be stored in Settings. This functionality is only available when the user is logged in. There, the user can unhide by clicking the unhide button.
9. Even when user reloads the page, hidden posts will remain hidden.
10. User is able to log out once Logout is clicked on the NavBar.
11. If the user presses back space after log in, it will take the user back to the Login page with the username and password credentials already filled out. When changes are made to those credentials, it will immediately logout the user.

##INSTALLATION

Use npm to install all packages related to this project via:

```bash
npm install
```
##HOW TO USE

1. User will need to start json-server via:

```bash
json-server --watch mockdata.json --port 8000
```

2. User will need to start the react app via:

```bash
npm start
```

##SUPPLEMENTAL INFORMATION

These are the different user credentials to login to the App:

user1 -->
    username: 'user'
    password: '123'

user2 --> 
    username: 'me'
    password: '123'





