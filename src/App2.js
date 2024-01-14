import './App2.css';
import logo from './images/logo.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import articlesResponse from './articles.json';
import userEvent from '@testing-library/user-event';

function Main() {
    const navigationMenu = [
    {title: 'Menu', link: 'url'},
    {title: 'Home', link: 'url'},
    {title: 'Shop', link: 'url'},
    {title: 'Search'},
    {title: 'Log out'},
    ];
    
    function articleToggle(action, articleIcon, articles, articlesContainer, articlesTitle) {
        const ACTIONS = {
            expand: 'expand',
            shrink: 'shrink'
        };
        
        switch(action) {
            case ACTIONS.expand:
                articles.style.transitionTimingFunction = 'cubic-bezier(0.5, 2.0, 0.5, 1)';
                articles.style.width = '250px';
                articleIcon.style.display = 'none';
                articlesContainer.style.display = 'block';
                articlesTitle.style.display = 'block';
                break;
            case ACTIONS.shrink:
                articles.style.transitionTimingFunction = 'cubic-bezier(1.0, 2.55, 0, 0.3)';
                articles.style.height = '35px';
                break;
            default:
                break;
        }
    };
    useEffect(() => {
        const articlesContainer = document.getElementById('articles-container');
        const articleIcon = document.getElementById('article-icon');
        const articles = document.getElementById('articles');
        const articlesTitle = document.getElementById('articles-title');
        const svg = document.querySelector('#articles svg');
        let isExpanded = false;
        const articlesContainerHeight = Number(getComputedStyle(articlesContainer).height.replace('px', ''));
        
        articlesContainer.addEventListener('mouseover', () => {
            articles.style.boxShadow = 'none';
        });
        articlesContainer.addEventListener('mouseleave', () => {
            articles.style.boxShadow = '';
        });

        articles.addEventListener('click', (e) => {
            if(e.target == articlesTitle || e.target == articles || e.target == svg || e.target == svg.firstChild) {
                if(isExpanded == false) {
                    articleToggle('expand', articleIcon, articles, articlesContainer, articlesTitle);
                    isExpanded = true;
                }
                else {
                    articleToggle('shrink', articleIcon, articles, articlesContainer, articlesTitle);
                    isExpanded = false;
                }
            }
        });
        articles.addEventListener('transitionend', (e) => {
            if(isExpanded == true) {
                if(articlesContainerHeight > 700)
                    articles.style.height = '700px';
                else if(articlesContainerHeight < 700)
                    articles.style.height = '400px';
                articleIcon.style.display = 'none';
            } else {
                articles.style.width = '35px';
                articleIcon.style.display = 'block';
                articlesTitle.style.display = '';
            }
            if(isExpanded == false && e.propertyName == 'height')
                articlesContainer.style.display = 'none';
        });
    }, []);

    function Article({ article }) {
        return(
            <div className="article-box">
                <p className="article-title">
                    {article.Title}
                </p>
                <p className="article-author">
                    {article.Author}
                </p>
                <p className="article-date">
                    {article.Date}
                </p>
                {article.Image != null && (
                <img className="article-img" src={article.Image} alt="Article" draggable="false" />
                )}
            </div>
        )
    };
    
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
    
    function Scroll() {
        useEffect(() => {
            const articles = document.querySelector('#articles');
            const articlesContainer = document.querySelector('#articles-container');
            const articlesHeight = getComputedStyle(articles).height.replace('px', '');
            const articlesContainerHeight = getComputedStyle(articlesContainer).height.replace('px', '');
            
            if(articlesContainerHeight > articlesHeight) {
                
            }
        });
        
        return(
            <div id="articles-scroll">

            </div>
        )
    };
    /* WORK IN PROGRESS */
    useEffect(() => {
        const articlesContainer = document.getElementById('articles-container');
        const articlesTitle = document.getElementById('articles-title');
        const articlesScroll = document.getElementById('articles-scroll');
        let isClicked = 0, scroll = 0, containerScroll = 0;
        
        articlesContainer.addEventListener('mousedown', (e) => {
            isClicked = 1;
        });
        articlesContainer.addEventListener('mousemove', (e) => {
            const maxHeight = articlesContainer.clientHeight;
            
            if(isClicked == 1 && scroll >= 0 && scroll <= maxHeight) {
                scroll = scroll - e.movementY;
                containerScroll = containerScroll + (e.movementY / 2);
                articlesScroll.style.top = `${scroll}px`;
                articlesContainer.style.transform = `translateY(${containerScroll}px)`;
                articlesTitle.style.transform = `translateY(${containerScroll}px)`;
                if(scroll > maxHeight) {
                    scroll = maxHeight;
                    containerScroll = -(maxHeight/2);
                    articlesScroll.style.top = `${scroll}px`;
                    articlesContainer.style.transform = `translateY(${-(maxHeight/2)}px)`;
                    articlesTitle.style.transform = `translateY(${-(maxHeight/2)}px)`;
                }
                if(scroll < 0) {
                    scroll = 0;
                    containerScroll = 0;
                    articlesScroll.style.top = `${scroll}px`;
                    articlesContainer.style.transform = `translateY(${0}px)`;
                    articlesTitle.style.transform = `translateY(${0}px)`;
                }
            }
        });
        window.addEventListener('mouseup', (e) => {
            isClicked = 0;

        });
    }, []);

    return(
        <div id="main-container">
            <nav id="navigation">
                <div id="logo-container">
                    <img src={logo} id='logo'></img>
                </div>
                <ul id="navigation-menu">
                    {navigationMenu.map((item) => {
                        return <li>{item.title}</li>
                    })}
                </ul>
            </nav>
            <div id="articles">
                <FontAwesomeIcon icon={faFileLines} id="article-icon" />
                <div id="articles-title">
                    Articles
                </div>
                <div id="articles-container">
                    {articlesResponse.Articles.map((article, index) => {
                        return <Article article={article} key={index} />;
                    })}
                    <Scroll />
                </div>
            </div>
        </div>
    )
}

export default Main;