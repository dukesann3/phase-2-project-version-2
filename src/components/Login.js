import { useOutletContext } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

function Login() {

    const [loggedInUserData, login, logout, userPassCheckingAlgo] = useOutletContext();
    const {isLoggedIn, id} = loggedInUserData;
    const [form, setForm] = useState({
        username: '',
        password: '',
    });
    const onChangeCount = useRef(0);

    function handleChange(e) {
        //need to logout when it first changes value here.
        onChangeCount.current = onChangeCount.current + 1;
        //logs out because you are now logging into a new account right?
        if (onChangeCount.current === 1 && isLoggedIn) {
            logout(id);
        }
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    //checks if user is already logged in or not.
    useEffect(() => {
        //if it is logged in, get the login values from local Storage.
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
    }, [isLoggedIn]);

    function onSubmital(e) {
        e.preventDefault();
        const { username, password } = form;
        const user = userPassCheckingAlgo(username, password);
        if (user) {
            //check if user is being bypassed here.
            debugger;
            login(user[0].id);
        }
        else {
            const loginForm = document.querySelector('#loginForm');
            const alertParagraph = document.createElement('p');
            alertParagraph.textContent = 'Incorrect Username or Password';
            loginForm.appendChild(alertParagraph);
            //removes alert message after 3 seconds.
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
                value={isLoggedIn ? localStorage.getItem('username') : form.username}
                style={isLoggedIn ? { 'backgroundColor': 'gray' } : null}
            />
            <input id='password' type='password' name='password' placeholder='password'
                onChange={(e) => handleChange(e)}
                value={isLoggedIn ? localStorage.getItem('password') : form.password}
                style={isLoggedIn ? { 'backgroundColor': 'gray' } : null}
            />
            <input type='submit' value='SUBMIT' />
        </form>
    </>
);
}

export default Login;