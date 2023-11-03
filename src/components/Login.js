import { useOutletContext } from "react-router-dom";
import {username as realUserName} from "../userinfo";
import {password as realPassWord} from "../userinfo";
import { useState } from "react";

function Login() {

    const [isLoggedIn, login] = useOutletContext();
    const [form, setForm] = useState({
        username: '',
        password: '',
    });

    function handleChange(e){
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    function onSubmital(e){
        e.preventDefault();
        const {username, password} = form;
        if(username === realUserName && password === realPassWord){
            login();
        }
        else{
            alert('password no work homie');
        }
    }

    return (
      <>
        <form onSubmit={(e) => onSubmital(e)}>
            <input type='text' name='username' placeholder='username'
                onChange={(e) => handleChange(e)}
            />
            <input type='password' name='password' placeholder='password'
                onChange={(e) => handleChange(e)}
            />
            <input type='submit' value='SUBMIT' />
        </form>
      </>
    );
  }
  
  export default Login;