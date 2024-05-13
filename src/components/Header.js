import "../styles/Header.css";
import logo from "../images/logo.jpg";
import { useEffect, useRef } from "react";
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

    const login = prop[0];
    const activeAccount = prop[1];
    const loginText = login ? <ProfilePhoto prop={activeAccount} /> : <LoginLink />;
    
    useEffect(() => {
        const navigation = navigationRef.current;
        const navigationMenu = navigationMenuRef.current;
        const navigationHeight = getComputedStyle(navigation).height.replace('px', '');
        const navigationMenuHeight = getComputedStyle(navigationMenu).height.replace('px', '');
        const heightDifference = navigationHeight - navigationMenuHeight;

        const navigationMenuLis = document.querySelectorAll('#navigation-menu > li');
        let imageStartsAt = 100 / (window.innerWidth / navigationMenuLis[0].getBoundingClientRect().left);
        let imageEndsAt = 100 / (window.innerWidth / (navigationMenuLis[navigationMenuLis.length - 1].getBoundingClientRect().right + 10));
        let backgroundImage;
        function getBackgroundImage() { 
            backgroundImage = window.innerWidth > 500 ? 
            `linear-gradient(45deg, rgba(17, 0, 255, 0.4) 10%, rgba(0, 167, 179, 0.5) ${imageStartsAt}%, rgba(249, 255, 0, 0.95) ${imageStartsAt}%, rgba(235, 110, 110, 0.90) ${imageEndsAt}%, rgba(71, 223, 254, 0.4) ${imageEndsAt}%)`
            :
            'linear-gradient(210deg, rgba(30, 255, 255, 0.85) 5%, rgba(63, 159, 245, 0.9) 40%, rgba(53, 59, 255, 0.85) 95%)';
        };
        getBackgroundImage();
        window.addEventListener('resize', () => {
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
                    navigation.style.height = `${navigationHeight}px`;
                    navigationMenu.style.position = 'fixed';
                    navigationMenu.style.top = '0px';
                    navigationMenu.style.backgroundImage = backgroundImage;
                    navigation.style.backgroundImage = 'none';
                    navigationMenu.style.borderBottomLeftRadius = '20px';
                    navigationMenu.style.borderBottomRightRadius = '20px';
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
        let copyText, copyBox;

        if(e.target instanceof SVGPathElement) {
            copyText = e.target.parentElement.parentElement.children[1].innerHTML;
            copyBox = e.target.parentElement.parentElement.querySelector('.copy-box');
        }
        else {
            copyText = e.target.parentElement.children[1].innerHTML;
            copyBox = e.target.parentElement.querySelector('.copy-box');
        }
        navigator.clipboard.writeText(copyText);

        function rollBack(e) {
            if(e.propertyName === 'transform')
            if(getComputedStyle(copyBox).transform === 'matrix(1, 0, 0, 1, 0, 100)') {
                copyBox.style.transform = '';
                copyBox.style.zIndex = '';
                copyBox.removeEventListener('transitionend', rollBack);
            }
        };

        copyBox.style.zIndex = '1';
        copyBox.style.transform = 'translateY(25px)';
        copyBox.style.opacity = '1';
        
        setTimeout(() => {
            copyBox.style.transform = 'translateY(100px)';
            copyBox.style.opacity = '';
        }, 1500);

        copyBox.addEventListener('transitionend', rollBack);
    };

    return(
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
    )
};

export default Header;