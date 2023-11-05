import { useOutletContext } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

function Login() {

    const [isLoggedIn, login, logout] = useOutletContext();
    const [form, setForm] = useState({
        username: '',
        password: '',
    });
    const [userData, setUserData] = useState(null);
    const onChangeCount = useRef(0);

    function handleChange(e) {
        //need to logout when it first changes value here.
        onChangeCount.current = onChangeCount.current + 1;
        //logs out because you are now logging into a new account right?
        if (onChangeCount.current === 1) {
            logout();
        }
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

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

    useEffect(() => {
        fetch('http://localhost:8000/users')
            .then(response => response.json())
            .then((users) => {
                console.log(users);
                setUserData(users);
            });
    }, []);

    function userPassCheckingAlgo(data, username, password) {
        const answer = data.filter((el) => {
            console.log(el);
            if (el.username === username && el.password === password) {
                return true;
            }
            return false;
        })
        if(answer.length <= 0){
            return null;
        }
        console.log(answer);
        return answer;
    }

    function onSubmital(e) {
        e.preventDefault();
        const { username, password } = form;
        const user = userPassCheckingAlgo(userData, username, password);
        if (user) {
            login(user[0].name);
            //when logged in, it stores the username and password in localstorage.
            //Although it is not advisable this is what I know right now.
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
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