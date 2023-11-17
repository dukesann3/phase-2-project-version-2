import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";

function Login() {

    const [login, logout, userPassCheckingAlgo, userDataBase, setUserDataBase, onHideShowPost, isDark, switchMode, loggedInUsersPostsList] = useOutletContext();
    const localLogInStatus = JSON.parse(localStorage.getItem('isLoggedIn'));
    const localId = JSON.parse(localStorage.getItem('id'));

    const [form, setForm] = useState({
        username: '',
        password: '',
    });
    const [loginError, setLoginError] = useState(false);

    function handleChange(e) {
        if (localLogInStatus) {
            logout(localId);
            debugger;
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
        const matchingUser = userPassCheckingAlgo(userDataBase, username, password);
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
            <div className="two fields" style={{
                'display': 'flex',
                'flexDirection': 'row',
                'marginTop': '3%',
                'marginLeft': '3%'
            }}>
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
