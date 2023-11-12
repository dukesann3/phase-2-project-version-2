import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";

function Login() {

    const [login, logout, userPassCheckingAlgo, userDataBase, setUserDataBase, onHideShowPost] = useOutletContext();
    const localLogInStatus = localStorage.getItem('isLoggedIn');
    const localId = JSON.parse(localStorage.getItem('id')-1);

    const [form, setForm] = useState({
        username: '',
        password: '',
    });

    function handleChange(e) {
        if (localLogInStatus) {
            logout(localId);
        }
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if (localStorage.getItem('username') && localStorage.getItem('password')) {
            setForm({
                ...form,
                username: localStorage.getItem('username'),
                password: localStorage.getItem('password')
            });
        }
        else {
            setForm({
                ...form,
                username: '',
                password: ''
            });
        }
    }, [localLogInStatus]);

    function onSubmital(e) {
        e.preventDefault();
        const { username, password } = form;
        const matchingUser = userPassCheckingAlgo(username, password);
        if (matchingUser) {
            const matchingUserId = matchingUser[0].id
            debugger;
            login(matchingUserId);
        }
        else {
            const loginForm = document.querySelector('#loginForm');
            const alertParagraph = document.createElement('p');
            alertParagraph.textContent = 'Incorrect Username or Password';
            loginForm.appendChild(alertParagraph);
            setTimeout(() => {
                loginForm.removeChild(alertParagraph);
            }, 3000);
        }
    }

return (
    <>
        <form id='loginForm' onSubmit={(e) => onSubmital(e)}>
            <input id='username' type='text' name='username' placeholder='username'
                onChange={(e) => handleChange(e)}
                value={localLogInStatus ? localStorage.getItem('username') : form.username}
                style={localLogInStatus ? { 'backgroundColor': 'gray' } : null}
            />
            <input id='password' type='password' name='password' placeholder='password'
                onChange={(e) => handleChange(e)}
                value={localLogInStatus ? localStorage.getItem('password') : form.password}
                style={localLogInStatus ? { 'backgroundColor': 'gray' } : null}
            />
            <input type='submit' value='SUBMIT' />
        </form>
    </>
);
}

export default Login;