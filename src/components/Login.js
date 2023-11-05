import { useOutletContext } from "react-router-dom";
import { username as realUserName } from "../userinfo";
import { password as realPassWord } from "../userinfo";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();
    const [isLoggedIn, login, logout] = useOutletContext();
    const [form, setForm] = useState({
        username: '',
        password: '',
    });
    const onChangeCount = useRef(0);

    function handleChange(e) {
        //need to logout when it first changes value here.
        onChangeCount.current = onChangeCount.current + 1;
        //logs out because you are now logging into a new account right?
        if(onChangeCount.current === 1){
            console.log('is log out?')
            logout();
        }
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        //if it is logged in, get the login values from local Storage.
        if(localStorage.getItem('username') && localStorage.getItem('password')){
            setForm({...form,
                username: localStorage.getItem('username'),
                password: localStorage.getItem('password')
            });
        }
        else{
            setForm({...form,
                username: '',
                password: ''
            });
        }
    },[isLoggedIn])

    function onSubmital(e) {
        e.preventDefault();
        const { username, password } = form;
        if (username === realUserName && password === realPassWord) {
            login();
            //when logged in, it stores the username and password in localstorage.
            //Although it is not advisable this is what I know right now.
            localStorage.setItem('username', realUserName);
            localStorage.setItem('password', realPassWord);
            navigate('/UserFeed');
        }
        else {
            alert('password no work homie');
        }
    }

    return (
        <>
            <form onSubmit={(e) => onSubmital(e)}>
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