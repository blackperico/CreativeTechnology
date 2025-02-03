import React, { useState, useEffect, useRef } from "react";
import '../styles/AccountOperations.css';
import accountsResponse from '../accounts.json';
import PopupMsg from './PopupMsg';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';
import { Helmet } from "react-helmet";
// replace alert with manual messsage box
//alert('Usernames: "aco", "cava", "funky"; Passwords: "admin"');

function Login({prop}) {
    const login = prop[0];
    const setLogin = prop[1];
    const homeUrl = '/CreativeTechnology/';

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(null);
    const loadingIconRef = useRef(null);
    const innerTextRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        const innerText = innerTextRef.current;
        const button = buttonRef.current;

        if(errors instanceof Array) {
            if(errors.length === 0) {
                const account = accountsResponse.find((acc) => {
                    if(acc.username === username && acc.password === password)
                        return acc;
                    return null;
                });

                if(account) {
                    sessionStorage.setItem('profile', account.id);
                    setTimeout(() => {
                        setLogin(true);
                        window.location.href = homeUrl;
                    }, 3500);
                }
                
                innerText.innerHTML = 'Logged in';
                button.style.backgroundColor = 'rgb(0 255 255)';
                button.style.color = '#000';

            } else {
                innerText.innerHTML = 'Try again';
                button.style.backgroundColor = 'rgb(255, 0, 0)';
            }
            
            innerText.style.display = 'block';
        }
    }, [errors]);
   
    function renderErrorMessage(inputField) {
        if(errors === null)
            return null;
        else
            return errors.map((error) => {
                if(error.name === inputField)
                    return <p className="error-message">{error.message}</p>
            });
    };

    function validateAccount() {
        const innerText = innerTextRef.current;
        const loadingIcon = loadingIconRef.current;

        innerText.style.display = 'none';
        loadingIcon.style.display = "block";
        
        return new Promise((resolve) => {
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
        });
    };

    async function handleSubmit(e) {
        e.preventDefault();
        const loadingIcon = loadingIconRef.current;

        loadingIcon.id = 'loading';

        try {
            const errors = await validateAccount();

            setErrors(errors);

            loadingIcon.style.display = 'none';
        } 
        catch(error) {
            alert('Error trying to validate account: ' + error);
        }
    };

    return(
        <>
        <PopupMsg />
        <div id="container">
            <Helmet>
                <title>Log in | CreativeTechnology</title>
            </Helmet>
            
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
        </>
    )
};

export default Login;