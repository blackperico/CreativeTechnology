import "../styles/Header.css";
import logo from "../images/logo.jpg";
import { useEffect, useRef } from "react";
import { Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareXTwitter, faLinkedin, faSquareFacebook, faSquareInstagram, faTelegram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';


function Header() {
    const navigationRef = useRef(null);
    const navigationMenuRef = useRef(null);
    /* implement ref hook, rework colors */
    useEffect(() => {
        const navigation = navigationRef.current;
        const navigationMenu = navigationMenuRef.current;
        const navigationHeight = getComputedStyle(navigation).height.replace('px', '');
        const navigationMenuHeight = getComputedStyle(navigationMenu).height.replace('px', '');
        const heightDifference = navigationHeight - navigationMenuHeight;
        
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
                    navigationMenu.style.backgroundImage = 'linear-gradient(rgba(85, 85, 85, 0.8), rgba(85, 85, 85, 0.4)';
                    navigation.style.backgroundImage = 'none';
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
                <li>Menu</li>
                <li><Link to="/">Home</Link></li>
                <li><Link to="Shop">Shop</Link></li>
                <li>Search</li>
                <li>Log out</li>
            </ul>
        </nav>

        <Outlet />
        </>
    )
};

export default Header;