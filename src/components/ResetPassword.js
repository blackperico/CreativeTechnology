import '../styles/AccountOperations.css';
import accountsResponse from '../accounts.json';
import { useState } from 'react';
import { Helmet } from 'react-helmet';

function ResetPassword() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);

    function renderErrorMessage() {
        if(error === null)
            return null;
        if(error === true)
            return <p className='error-message'>Email not found.</p>;
        if(error === false)
            return <p className='error-message' style={{color: 'green'}}>New password sent to email.</p>;
    };

    function isPresent() {
        let notFound = true;
        
        for(let account of accountsResponse) {
            if(account.email === email) {
                notFound = false;
                break;
            }
        }
        
        return notFound;
    };

    function handleSubmit(e) {
        e.preventDefault();
        
        setError(isPresent());
    };

    return(
        <div id="container">
            <Helmet>
                <title>Reset password | CreativeTechnology</title>
            </Helmet>

            <h3>Reset password</h3>

            <form onSubmit={handleSubmit}>
                <label htmlFor='email'>Enter your email: </label>
                <input id='email' className='input-box' type='text' onChange={(e) => setEmail(e.target.value)}></input>
                    {renderErrorMessage()}
                <button id='reset-button' type='submit'>Reset password</button>
            </form>
        </div>
    )
};

export default ResetPassword;