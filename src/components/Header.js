import "../styles/Header.css";
import logo from "../images/logo.jpg";
import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

function Header() {
    useEffect(() => {
        const navigationMenu = document.querySelector('#navigation-menu');
        const navigation = document.querySelector('#navigation');
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
                    navigationMenu.style.backgroundImage = 'linear-gradient(rgba(85, 85, 85, 0.6), rgba(85, 85, 85, 0.2))';
                    break;
                case POSITIONS.default:
                    navigation.style.height = '';
                    navigationMenu.style.position = '';
                    navigationMenu.style.top = '';
                    navigationMenu.style.backgroundImage = '';
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

    return(
        <>
        <nav id="navigation">
            <div id="logo-container">
                <img src={logo} id='logo'></img>
            </div>
            <ul id="navigation-menu">
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