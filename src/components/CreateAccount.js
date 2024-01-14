import React, {useState} from "react";
import "../styles/CreateAccount.css";

function CreateAccount() {
    function handleSubmit(e) {
        e.preventDefault();
        console.log('Username: ' + username + '\n' + 'Password: ' + password + '\n' + 'Email: ' + email);
    };
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div id="container">
            <h3>Create account</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input id="email" className="input-box" type="text" onChange={(e) => setEmail(e.target.value)}></input>
                <label htmlFor="username">Username:</label>
                <input id="username" className="input-box" type="text" onChange={(e) => setUsername(e.target.value)}></input>
                <label htmlFor="password">Password:</label>
                <input id="password" className="input-box" type="password" onChange={(e) => setPassword(e.target.value)}></input>
                <button id="button" type="submit">Create Account</button>
            </form>
        </div>
    )
};

export default CreateAccount;