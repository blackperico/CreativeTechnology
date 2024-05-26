import "../styles/Header.css";
import logo from "../images/logo.jpg";
import { useEffect, useRef, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareXTwitter, faLinkedin, faSquareFacebook, faSquareInstagram, faTelegram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faArrowRightFromBracket, faGear, faUser } from '@fortawesome/free-solid-svg-icons';

function ProfilePhoto({prop}) {
    const photoRef = useRef(null);
    const dropdownRef = useRef(null);
    const logoutRef = useRef(null);

    useEffect(() => {
        const photo = photoRef.current;
        const dropdown = dropdownRef.current;
        const logoutLink = logoutRef.current;

        function logout() {
            sessionStorage.removeItem('profile');
            window.location.reload();
        };
        function toggle(e) {
            if(e.target === photo) {
                const display = getComputedStyle(dropdown).display;

                if(display === 'none')
                    dropdown.style.display = 'flex';
                else
                    dropdown.style.display = 'none';
            }
        };

        photo.addEventListener('click', toggle);
        logoutLink.addEventListener('click', logout);
    }, []);
    
    return(
        <>
            <li id="profile-photo-container">
                <img className="profile-photo"
                    ref={photoRef}
                    src={require(`../profileimg/${prop.image}`)}
                    alt="profile-photo">

                </img>

                <ul id="profile-dropdown" ref={dropdownRef}>
                    <li id="profile-dropdown-name">{prop.username}</li>
                    <li>
                        <span className="profile-dropdown-icon"><FontAwesomeIcon icon={faUser} className="icon" /></span>
                        <div className="profile-dropdown-text">Profile</div>
                    </li>
                    <li>
                        <span className="profile-dropdown-icon"><FontAwesomeIcon icon={faGear} className="icon" /></span>
                        <div className="profile-dropdown-text">Account Settings</div>
                    </li>
                    <li ref={logoutRef}>
                        <span className="profile-dropdown-icon"><FontAwesomeIcon icon={faArrowRightFromBracket} className="icon" style={{transform: "rotate(180deg)"}} /></span>
                        <div className="profile-dropdown-text">Log out</div>
                    </li>
                </ul>
            </li>
        </>
    )
};
function LoginLink() {

    return(
        <li className="underline">
            <Link to="/Login">
                Log in
            </Link>
        </li>
    )
};

function Header({prop}) {
    const navigationRef = useRef(null);
    const navigationMenuRef = useRef(null);
    const [isLaptop, setIsLaptop] = useState(window.innerWidth <= 1024 ? true : false);

    const login = prop[0];
    const activeAccount = prop[1];
    const loginText = login ? <ProfilePhoto prop={activeAccount} /> : <LoginLink />;
    
    useEffect(() => {
        const navigation = navigationRef.current;
        const navigationMenu = navigationMenuRef.current;

        let navigationH = getComputedStyle(navigation).height.replace('px', '');
        const navigationMenuHeight = getComputedStyle(navigationMenu).height.replace('px', '');
        let heightDifference = navigationH - navigationMenuHeight;

        const navigationMenuLis = document.querySelectorAll('#navigation-menu > li');
        let imageStartsAt = 100 / (window.innerWidth / navigationMenuLis[0].getBoundingClientRect().left);
        let imageEndsAt = 100 / (window.innerWidth / (navigationMenuLis[navigationMenuLis.length - 1].getBoundingClientRect().right + 10));
        let backgroundImage;
        function getBackgroundImage() { 
            backgroundImage = window.innerWidth > 500 ? 
            `linear-gradient(45deg, rgba(17, 0, 255, 0.4) 10%, rgba(0, 167, 179, 0.5) ${imageStartsAt}%, rgba(249, 255, 0, 0.95) ${imageStartsAt}%, rgba(235, 110, 110, 0.90) ${imageEndsAt}%, rgba(71, 223, 254, 0.4) ${imageEndsAt}%)`
            :
            'linear-gradient(210deg, rgba(30, 255, 255, 0.85) 15%, rgb(0 161 255 / 90%) 46%, rgb(162 160 255 / 90%) 80%, rgba(200, 30, 255, 0.85) 100%)';
        };
        getBackgroundImage();
        
        window.addEventListener('resize', () => {
            window.innerWidth <= 1024 ? setIsLaptop(true) : setIsLaptop(false);
            navigationH = getComputedStyle(navigation).height.replace('px', '');
            heightDifference = navigationH - navigationMenuHeight;

            imageStartsAt = 100 / (window.innerWidth / navigationMenuLis[0].getBoundingClientRect().left);
            imageEndsAt = 100 / (window.innerWidth / (navigationMenuLis[navigationMenuLis.length - 1].getBoundingClientRect().right + 10));
            getBackgroundImage();
            if(getComputedStyle(navigationMenu).position === 'fixed')
                navigationMenu.style.backgroundImage = backgroundImage;
        });

        const POSITIONS = {
            fixed: 'fixed',
            default: 'default'
        };
        
        function position(position) {
            switch(position) {
                case POSITIONS.fixed:
                    navigation.style.height = `${navigationH}px`;
                    navigationMenu.style.position = 'fixed';
                    navigationMenu.style.top = '0px';
                    navigationMenu.style.backgroundImage = backgroundImage;
                    navigation.style.backgroundImage = 'none';
                    navigationMenu.style.borderBottomLeftRadius = '10px';
                    navigationMenu.style.borderBottomRightRadius = '10px';
                    break;
                case POSITIONS.default:
                    navigation.style.height = '';
                    navigationMenu.style.position = '';
                    navigationMenu.style.top = '';
                    navigationMenu.style.backgroundImage = '';
                    navigation.style.backgroundImage = '';
                    break;
                default:
                    break;
            }
        };

        if(window.scrollY >= heightDifference)
            position(POSITIONS.fixed);

        window.addEventListener('scroll', () => {
            if(window.scrollY >= heightDifference)
                position(POSITIONS.fixed);
            else
                position(POSITIONS.default);
        });
    }, []);

    function copyContact(e) {
        let copyText, outputMessage, textElement, attribute;

        if(e.target instanceof SVGPathElement) {
            textElement = e.target.parentElement.parentElement.children[1];
            attribute = textElement.getAttribute('data-value');
            copyText = e.target.parentElement.parentElement.children[1].innerHTML;
            outputMessage = e.target.parentElement.parentElement.querySelector('.copy-box');
        }
        else {
            textElement = e.target.parentElement.children[1];
            attribute = textElement.getAttribute('data-value');
            copyText = e.target.parentElement.children[1].innerHTML;
            outputMessage = e.target.parentElement.querySelector('.copy-box');
        }
        
        if(navigator.clipboard && navigator.clipboard.writeText) {
            if(attribute)
                navigator.clipboard.writeText(attribute);
            else
                navigator.clipboard.writeText(copyText);
        }
        else {
            if(attribute) {
                let tempSpan = document.createElement('span');
                tempSpan.className = 'tempCopySpan';
                tempSpan.textContent = attribute;

                document.body.appendChild(tempSpan);

                let range = document.createRange();
                let selection = window.getSelection();

                selection.removeAllRanges();

                range.selectNodeContents(tempSpan);
                selection.addRange(range);
                document.execCommand('copy');

                document.body.removeChild(tempSpan);
                selection.removeAllRanges();
            }
            else {
                let range = document.createRange();
                let selection = window.getSelection();

                selection.removeAllRanges();

                range.selectNodeContents(textElement);
                selection.addRange(range);
                document.execCommand('copy');

                selection.removeAllRanges();
            }
        }

        function rollBack(e) {
            if(e.propertyName === 'transform')
            if(getComputedStyle(outputMessage).transform === 'matrix(1, 0, 0, 1, 0, 100)') {
                outputMessage.style.transform = '';
                outputMessage.style.zIndex = '';
                outputMessage.removeEventListener('transitionend', rollBack);
            }
        };

        outputMessage.style.zIndex = '1';
        outputMessage.style.transform = 'translateY(25px)';
        outputMessage.style.opacity = '1';
        
        setTimeout(() => {
            outputMessage.style.transform = 'translateY(100px)';
            outputMessage.style.opacity = '';
        }, 1500);

        outputMessage.addEventListener('transitionend', rollBack);
    };

    return(
        <>
        {isLaptop ? (
            <>
            <nav id="navigation" ref={navigationRef}>
                <div id="header-container">
                    <Link to="/">
                        <img src={logo} id="logo">
                            
                        </img>
                    </Link>

                    <div id="socials-wrap">
                        <div id="header-social-media">
                            <p>Find us on social media: </p>
                            <div id="social-links">
                                <a href="https://twitter.com/" target="_blank">
                                    <FontAwesomeIcon icon={faSquareXTwitter} className="media-icon" />
                                </a>
                                <a href="https://linkedin.com/" target="_blank">
                                    <FontAwesomeIcon icon={faLinkedin} className="media-icon" />
                                </a>
                                <a href="https://facebook.com/" target="_blank">
                                    <FontAwesomeIcon icon={faSquareFacebook} className="media-icon" />
                                </a>
                                <a href="https://instagram.com/" target="_blank">
                                    <FontAwesomeIcon icon={faSquareInstagram} className="media-icon" />
                                </a>
                                <a href="https://telegram.org/" target="_blank">
                                    <FontAwesomeIcon icon={faTelegram} className="media-icon" />
                                </a>
                            </div>
                        </div>

                        <div id="header-contact">
                            <p>Contact us: </p>
                            <div id="contact-links">
                                <div className="header-contact-info">
                                    <FontAwesomeIcon icon={faEnvelope} className="media-icon" onClick={copyContact} /> 
                                    <p id="email" data-value="aleksandarstanojevic93@gmail.com"></p>
                                    <div className="copy-box">
                                        Email copied!
                                    </div>
                                </div>

                                <div className="header-contact-info">
                                    <FontAwesomeIcon icon={faPhone} className="media-icon" onClick={copyContact} />
                                    <p id="phone" data-value="068-430-139"></p>
                                    <div className="copy-box">
                                        Phone number copied!
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <ul id="navigation-menu" ref={navigationMenuRef}>
                    <li className="underline">Menu</li>
                    <li className="underline"><Link to="/">Home</Link></li>
                    <li className="underline"><Link to="/Shop">Shop</Link></li>
                    <li className="underline">Search</li>
                    {loginText}
                </ul>
            </nav>

        <Outlet />
            </>
        ) : ( 
        <>
        <nav id="navigation" ref={navigationRef}>
            <div id="header-container">
                <div id="header-social-media">
                    <p>Find us on social media: </p>
                    <a href="https://twitter.com/" target="_blank">
                        <FontAwesomeIcon icon={faSquareXTwitter} className="media-icon" />
                    </a>
                    <a href="https://linkedin.com/" target="_blank">
                        <FontAwesomeIcon icon={faLinkedin} className="media-icon" />
                    </a>
                    <a href="https://facebook.com/" target="_blank">
                        <FontAwesomeIcon icon={faSquareFacebook} className="media-icon" />
                    </a>
                    <a href="https://instagram.com/" target="_blank">
                        <FontAwesomeIcon icon={faSquareInstagram} className="media-icon" />
                    </a>
                    <a href="https://telegram.org/" target="_blank">
                        <FontAwesomeIcon icon={faTelegram} className="media-icon" />
                    </a>
                </div>

                <Link to="/">
                    <img src={logo} id="logo">
                        
                    </img>
                </Link>

                <div id="header-contact">
                    <p>Contact us: </p>
                    <div className="header-contact-info">
                        <FontAwesomeIcon icon={faEnvelope} className="media-icon" onClick={copyContact} /> 
                        <p id="email">aleksandarstanojevic93@gmail.com</p>
                        <div className="copy-box">
                            Email copied!
                        </div>
                    </div>

                    <div className="header-contact-info">
                        <FontAwesomeIcon icon={faPhone} className="media-icon" onClick={copyContact} />
                        <p id="phone">068-430-139</p>
                        <div className="copy-box">
                            Phone number copied!
                        </div>
                    </div>
                </div>
            </div>
            <ul id="navigation-menu" ref={navigationMenuRef}>
                <li className="underline">Menu</li>
                <li className="underline"><Link to="/">Home</Link></li>
                <li className="underline"><Link to="/Shop">Shop</Link></li>
                <li className="underline">Search</li>
                {loginText}
            </ul>
        </nav>

        <Outlet />
        </>
        )}
        </>
    )
};

export default Header;