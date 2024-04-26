import React, { useState, useRef } from "react";
import '../styles/AccountOperations.css';
import accountsResponse from '../accounts.json';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';

function Login({prop}) {
    const login = prop[0];
    const setLogin = prop[1];
    const homeUrl = 'http://localhost:3000';
    let account;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(null);
    const loadingIconRef = useRef(null);
    const innerTextRef = useRef(null);
    const buttonRef = useRef(null);
   
/* LOGGING IN ANIMATION IF NO ERRORS PRESENT WITH SETTIMEOUT
CHANGE INDEX.JS LOGGEDIN STATE (HAS TO HAVE INFO ABOUT WHICH ACCOUNT IS IN USE)
CHANGE NAV MENU TO LOG OUT AND DISPLAY PROFILE IMG NEXT TO IT
PROFILE PIC DROPDOWN MENU */
    function renderErrorMessage(inputField) {
        if(errors === null)
            return null;
        else
            return errors.map((error) => {
                if(error.name === inputField)
                    return <p className="error-message">{error.message}</p>
            });
    };
    function changeLogin() {
        if(errors === null) {
            setLogin(!login);
            sessionStorage.setItem('profile', account.id);
            setTimeout(() => {
                window.location.href = homeUrl;
            }, 0)
        }
    };
/* prilikom klika F-ja validateAccount postavlja ikonicu load, vraca return nakon 1s, zakriva ikonicu i ispisuje Logged in ili Default vrednost */
    function validateAccount() {
        const innerText = innerTextRef.current;
        const loadingIcon = loadingIconRef.current;

        innerText.style.display = 'none';
        loadingIcon.style.display = "block";
        
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let returnErrors = [];
                const credentials = {
                    username: {
                        name: 'username',
                        value: false,
                        message: 'Username not found.'
                    },
                    password: {
                        name: 'password',
                        value: false,
                        message: 'Incorrect password!'
                    }
                };
        
                if(username === '')
                    credentials.username.message = 'Enter username.';
                if(password === '')
                    credentials.password.message = 'Enter password.';
                
                for(let account of accountsResponse)
                    if(account.username === username) {
                        credentials.username.value = true;
                        if(account.password === password) {
                            credentials.password.value = true;
                        }
                        break;
                    }
                
                for(let credential in credentials)
                    if(!credentials[credential].value) {
                        returnErrors.push(credentials[credential]);
                    }
        
                resolve(returnErrors);
            }, 5000);
            /*setTimeout(() => {
                changeLogin();
            }, 6000);*/
        });
    };

    async function handleSubmit(e) {
        e.preventDefault();
        const innerText = innerTextRef.current;
        const loadingIcon = loadingIconRef.current;
        const button = buttonRef.current;

        loadingIcon.id = 'loading';

        try {
            const errors = await validateAccount();
            setErrors(errors);
            if(errors.length === 0) {
                account = accountsResponse.find((acc) => {
                    if(acc.username === username && acc.password === password)
                        return acc;
                });
                setTimeout(changeLogin, 1000);
            }
            
            loadingIcon.style.display = 'none';
            if(errors.length > 0) {
                innerText.innerHTML = 'Try again';
                button.style.backgroundColor = '#ff2a2a';
            }
            else {
                innerText.innerHTML = 'Logged in';
                button.style.backgroundColor = '#34ff34';
            }
            innerText.style.display = 'block';
        } catch(error) {
            alert('Error trying to validate account: ' + error);
        }
    };

    return(
        <div id="container">
            <h3>Log into account</h3>

            <form onSubmit={handleSubmit}>

                <label htmlFor="username">Username:</label>
                <input
                    id="username"
                    className="input-box"
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}></input>

                    {renderErrorMessage('username')}

                <label htmlFor="password">Password:</label>
                <input 
                    id="password"
                    className="input-box"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}></input>

                    {renderErrorMessage('password')}

                <button ref={buttonRef} id="button" type="submit">
                    <FontAwesomeIcon 
                        icon={faSpinner} ref={loadingIconRef}
                        style={{color: "#000000", fontSize: "18px", display: "none", margin: "0 auto"}} />
                    <span ref={innerTextRef}>Log in</span>
                </button>

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