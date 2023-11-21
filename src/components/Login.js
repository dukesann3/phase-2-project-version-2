import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import "../css files/Login.css"

function Login() {

    const [login, logout, userLoginVerifier, userDataBase, setUserDataBase, onHideShowPost, isDark, switchMode] = useOutletContext();
    const localLogInStatus = JSON.parse(localStorage.getItem('isLoggedIn'));
    const localId = JSON.parse(localStorage.getItem('id'));
    const localUserDataBase = JSON.parse(localStorage.getItem('theEntireThing'));

    const [form, setForm] = useState({
        username: '',
        password: '',
    });
    const [loginError, setLoginError] = useState(false);

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
        const matchingUser = userLoginVerifier(localUserDataBase, username, password);
        if (matchingUser) {
            const matchingUserId = matchingUser[0].id
            login(matchingUserId);
        }
        else {
            const loginForm = document.querySelector('#loginForm');
            loginForm.classList.add('error');
            setLoginError(true);
            setTimeout(() => {
                setLoginError(false);
                loginForm.classList.remove('error');
            }, 3000);
        }
    }

    return (
        <form id='loginForm' onSubmit={(e) => onSubmital(e)} className="ui small form" style={{
            'width': '50%',
        }}>
            <div className="two fields set-straight">
                <div className="field">
                    <label style={isDark ? {'color': 'white'} : {'color': 'black'}}>username</label>
                    <input id='username' type='text' name='username' placeholder='username'
                        onChange={(e) => handleChange(e)}
                        value={localLogInStatus ? localStorage.getItem('username') : form.username}
                        style={localLogInStatus ? { 'backgroundColor': 'gray' } : null}
                    />
                </div>
                <div className="field">
                    <label style={isDark ? {'color': 'white'} : {'color': 'black'}}>password</label>
                    <input id='password' type='password' name='password' placeholder='password'
                        onChange={(e) => handleChange(e)}
                        value={localLogInStatus ? localStorage.getItem('password') : form.password}
                        style={localLogInStatus ? { 'backgroundColor': 'gray' } : null}
                    />
                </div>
                <input type='submit' value='SUBMIT' className='ui button submit' />
            </div>
            {loginError ?
                <div className="ui error message" style={{'marginLeft': '3%'}}>
                    <div className="header">Action Forbidden</div>
                    <p>Incorrect Username or Password</p>
                </div> : null}
        </form>
    );
}

export default Login;
