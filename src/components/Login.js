import React, {useState} from "react";
import '../styles/Login.css';
import { Link } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        console.log('Username: ' + username + '\n' + 'Password: ' + password);
    }

    return(
        <div id="login-container">
            <h3>Log into account</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input 
                    id="username" 
                    className="input-box"
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}></input>
                <label htmlFor="password">Password:</label>
                <input 
                    id="password"
                    className="input-box"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}></input>
                <button id="log-in-button" type="submit">Log in</button>
            </form>
            <Link to="/ResetPassword" id="password-reset">Forgot password?</Link>
            <div id="create-account">
                <p>Don't have an account yet?</p>
                <Link to="/CreateAccount">Create account</Link>
            </div>
        </div>
    )
};

export default Login;