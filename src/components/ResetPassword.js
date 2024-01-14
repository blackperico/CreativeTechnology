import '../styles/ResetPassword.css';

function ResetPassword() {
    function handleSubmit(e) {
        e.preventDefault();

    }
    return(
        <div id="container">
            <h3>Reset password</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor='email'>Enter your email: </label>
                <input id='email' className='input-box' type='text'></input>
                <button id='reset-button' type='submit'>Reset password</button>
            </form>
        </div>
    )
};

export default ResetPassword;