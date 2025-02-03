import { useEffect, useRef } from 'react';
import '../styles/popupmsg.css';

function PopupMsg() {
    const msgContainerRef = useRef(null);

    useEffect(() => {
        const msgContainer = msgContainerRef.current;
        msgContainer.classList.add('drop-in-class');
        
        msgContainer.addEventListener('animationend', (e) => {
            if(e.animationName === 'drop-in') {
                setTimeout(() => {
                    msgContainer.classList.add('fade-out-class');
                }, 4000);
            }
        });
    }, []);

    return(
        <div id='msg-container' ref={msgContainerRef}>
            <ul className='usernames'>
                <li id='username-title'>Usernames</li>
                <li>aco</li>
                <li>cava</li>
                <li>funky</li>
            </ul>
            <ul className='passwords'>
                <li id='password-title'>Passwords</li>
                <li>admin</li>
            </ul>
        </div>
    )
};

export default PopupMsg;