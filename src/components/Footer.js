import '../styles/Footer.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareXTwitter, faLinkedin, faSquareFacebook, faSquareInstagram, faTelegram } from '@fortawesome/free-brands-svg-icons';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";

function Footer() {
    const [isLaptop, setIsLaptop] = useState(window.innerWidth <= 1024 ? true : false);
    
    useEffect(() => {
        const footerCollapsibleTriggers = document.querySelectorAll('#footer-collapsible-trigger');
        const footerCollapsibleContents = document.querySelectorAll('#footer-collapsible-content');
        const footerCollapsibleContentsH = Array.from(footerCollapsibleContents).map((content) => {
            return content.clientHeight + 'px';
        });

        footerCollapsibleContents.forEach((content) => {
            content.style.height = '0px';
        });

        function handleResize() {
            window.innerWidth <= 1024 ? setIsLaptop(true) : setIsLaptop(false);
        };
        function handleCollapsible(index) {
            const arrow = footerCollapsibleTriggers[index].querySelector('#footer-collapsible-arrow');
            
            if(getComputedStyle(arrow).transform === 'matrix(-1, 0, 0, -1, 0, 0)') {
                footerCollapsibleContents[index].style.height = '0px';
                arrow.style.transform = '';
            } else {
                footerCollapsibleContents[index].style.height = footerCollapsibleContentsH[index];
                arrow.style.transform = 'rotate(180deg)';
            }
        };
        
        window.addEventListener('resize', handleResize);
        footerCollapsibleTriggers.forEach((trigger, index) => {
            trigger.addEventListener('click', () => handleCollapsible(index));
        });

        return () => {
            window.removeEventListener('resize', handleResize);
            footerCollapsibleTriggers.forEach((trigger, index) => {
                trigger.removeEventListener('click', () => handleCollapsible(index));
            });
            footerCollapsibleContents.forEach((content) => {
                content.style.height = '';
            });
        }
    }, [isLaptop]);

    return (
        <>
        <div id="footer">
            <div id="footer-wrap">
                <div id="footer-top">
                    <h1 id="footer-top-logo">Creative Technology</h1>

                    <div id="footer-top-links">
                        <div id="footer-top-links-link">
                            <Link to="/">
                                Home
                            </Link> 
                        </div>
                        <div id="footer-top-links-link">
                            <Link to="/Shop">
                                Shop
                            </Link>
                        </div>
                    </div>

                    <div id="footer-top-socials">
                        <a href="https://twitter.com/" target="_blank">
                            <FontAwesomeIcon icon={faSquareXTwitter} className="footer-top-socials-social" />
                        </a>
                        <a href="https://linkedin.com/" target="_blank">
                            <FontAwesomeIcon icon={faLinkedin} className="footer-top-socials-social" />
                        </a>
                        <a href="https://facebook.com/" target="_blank">
                            <FontAwesomeIcon icon={faSquareFacebook} className="footer-top-socials-social" />
                        </a>
                        <a href="https://instagram.com/" target="_blank">
                            <FontAwesomeIcon icon={faSquareInstagram} className="footer-top-socials-social" />
                        </a>
                        <a href="https://telegram.org/" target="_blank">
                            <FontAwesomeIcon icon={faTelegram} className="footer-top-socials-social" />
                        </a>
                    </div>
                </div>

                <div id="footer-bottom">
                    {isLaptop ? (
                        <>
                        <div id="footer-collapsible">
                            <div id="footer-collapsible-trigger">
                                <span>USER ACCOUNT</span>
                                <FontAwesomeIcon id='footer-collapsible-arrow' icon={faCaretUp} />
                            </div>
                            <div id="footer-collapsible-content">
                            <Link to="/Login">
                                Log into account.
                            </Link>
                            <Link to="/CreateAccount">
                                Create account.
                            </Link>
                            <Link to="/ResetPassword">
                                Forgot password?
                            </Link>
                            </div>
                        </div>
                        <div id="footer-collapsible">
                            <div id="footer-collapsible-trigger">
                                <span>CONTACT</span>
                                <FontAwesomeIcon id='footer-collapsible-arrow' icon={faCaretUp} />
                            </div>
                            <div id="footer-collapsible-content">
                            <Link to="">
                                Email address.
                            </Link>
                            <Link to="">
                                Phone number.
                            </Link>
                            </div>
                        </div>
                        <div id="footer-collapsible">
                            <div id="footer-collapsible-trigger">
                                <span>ABOUT US</span>
                                <FontAwesomeIcon id='footer-collapsible-arrow' icon={faCaretUp} />
                            </div>
                            <div id="footer-collapsible-content">
                            <Link to="">
                                Company history.
                            </Link>
                            <Link to="">
                                What is Creative Technology?
                            </Link>
                            <Link to="">
                                Working at Creative Technology.
                            </Link>
                            </div>
                        </div>
                        <div id="footer-collapsible">
                            <div id="footer-collapsible-trigger">
                                <span>PAYMENT</span>
                                <FontAwesomeIcon id='footer-collapsible-arrow' icon={faCaretUp} />
                            </div>
                            <div id="footer-collapsible-content">
                            <Link to="">
                                Payment methods.
                            </Link>
                            <Link to="">
                                Shipping.
                            </Link>
                            </div>
                        </div>
                        </>
                    ) : (
                    <>
                    <div id="footer-box">
                        <h5 className='footer-box-title'>USER ACCOUNT</h5>
                        <div className='footer-box-links'>
                            <div className='footer-box-links-link'>
                                <Link to="/Login">
                                    Log into account.
                                </Link>
                            </div>
                            <div className='footer-box-links-link'>
                                <Link to="/CreateAccount">
                                    Create account.
                                </Link>
                            </div>
                            <div className='footer-box-links-link'>
                                <Link to="/ResetPassword">
                                    Forgot password?
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div id="footer-box">
                        <h5 className='footer-box-title'>CONTACT</h5>
                        <div className='footer-box-links-link'>
                            <Link to="">
                                Email address.
                            </Link>
                        </div>
                        <div className='footer-box-links-link'>
                            <Link to="">
                                Phone number.
                            </Link>
                        </div>
                    </div>

                    <div id="footer-box">
                        <h5 className='footer-box-title'>ABOUT US</h5>
                        <div className='footer-box-links-link'>
                            <Link to="">
                                Company history.
                            </Link>
                        </div>
                        <div className='footer-box-links-link'>
                            <Link to="">
                                What is Creative Technology?
                            </Link>
                        </div>
                        <div className='footer-box-links-link'>
                            <Link to="">
                                Working at Creative Technology.
                            </Link>
                        </div>
                    </div>

                    <div id="footer-box">
                        <h5 className='footer-box-title'>PAYMENT</h5>
                        <div className='footer-box-links-link'>
                            <Link to="">
                                Payment methods.
                            </Link>
                        </div>
                        <div className='footer-box-links-link'>
                            <Link to="">
                                Shipping.
                            </Link>
                        </div>
                    </div>
                    </>
                    )}
                </div>
            </div>
        </div>
        </>
    )
}

export default Footer;