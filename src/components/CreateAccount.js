import React, {useState} from "react";
import "../styles/AccountOperations.css";
import accountsResponse from '../accounts.json';

function CreateAccount() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(null);

    function renderErrorMessage(fieldName) {
        if(errors === null) 
            return null;
        else {
            return errors.map((error) => {
                if(error.name === fieldName) {
                    return <p className="error-message">{error.message}</p>;
                }
            })
        }
    };
    
    function isNotAvailable() {
        let returnErrors = [];
        let credentials = {
            email: {
                value: true,
                name: 'email',
                message: ''
            },
            username: {
                value: true,
                name: 'username',
                message: ''
            }
        };

        for(let account of accountsResponse) {
            if(email === account.email) {
                credentials.email.value = false;
                credentials.email.message = 'Email is already in use.';
            }
            if(username === account.username) {
                credentials.username.value = false;
                credentials.username.message = 'Username is taken.';
            }
            if(credentials.email.value === false && credentials.username.value === false)
                break;
        };
        
        for(let key in credentials)
            if(credentials[key].value === false)
                returnErrors.push(credentials[key]);
        
        if(returnErrors.length > 0)
            return returnErrors;
        else
            return null;
    };

    function isNotValid() {
        let returnErrors = [];
        let credentials = {
            email: {
                value: true,
                name: 'email',
                message: ''
            },
            username: {
                value: true,
                name: 'username',
                message: ''
            },
            password: {
                value: true,
                name: 'password',
                message: '',
                tooShort: false,
                numberPresent: false,
                upperCasePresent: false
            }
        };

        if(email === '') {
            credentials.email.value = false;
            credentials.email.message = 'Enter email.';
        }
        if(username.length < 3) {
            credentials.username.value = false;
            credentials.username.message = 'Username too short.';
        }
        if(password.length < 8) {
            credentials.password.tooShort = true;
            credentials.password.message = 'Password must contain 8 characters.';
        }
        for(let letter of password) {
            if(!isNaN(letter))
                credentials.password.numberPresent = true;
            else
                credentials.password.message = 'Password must contain number.';
            if(letter === letter.toUpperCase() && letter !== letter.toLowerCase())
                credentials.password.upperCasePresent = true;
            else
                credentials.password.message = 'Password must contain upper case';
        }
        
        if(credentials.password.tooShort === true)
            credentials.password.value = false;
        if(credentials.password.numberPresent === false)
            credentials.password.value = false;
        if(credentials.password.upperCasePresent === false)
            credentials.password.value = false;

        for(let key in credentials)
            if(credentials[key].value === false)
                returnErrors.push(credentials[key]);
        
        if(returnErrors.length > 0)
            return returnErrors;
        else
            return null;
    };
    
    function handleSubmit(e) {
        e.preventDefault();

        const validationErrors = isNotValid();
        if(validationErrors !== null)
            setErrors(validationErrors);
        else
            setErrors(isNotAvailable());
    };

    return (
        <div id="container">
            <h3>Create account</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email-input">Email:</label>
                <input id="email-input" className="input-box" type="text" onChange={(e) => setEmail(e.target.value)}></input>
                    {renderErrorMessage('email')}
                <label htmlFor="username-input">Username:</label>
                <input id="username-input" className="input-box" type="text" onChange={(e) => setUsername(e.target.value)}></input>
                    {renderErrorMessage('username')}
                <label htmlFor="password-input">Password:</label>
                <input id="password-input" className="input-box" type="password" onChange={(e) => setPassword(e.target.value)}></input>
                    {renderErrorMessage('password')}
                <button id="button" type="submit">Create Account</button>
            </form>
        </div>
    )
};

export default CreateAccount;