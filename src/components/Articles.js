import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import articlesResponse from '../articles.json';

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
        <div id="scroll-path">
            <div id="articles-scroll">

            </div>
        </div>
    )
};

function Main() {
    /* Open/Close */
    useEffect(() => {
        const articlesContainer = document.getElementById('articles-container');
        const articleIcon = document.getElementById('article-icon');
        const articles = document.getElementById('articles');
        const articlesTitle = document.getElementById('articles-title');
        const svg = document.querySelector('#articles svg');
        const articlesContainerHeight = Number(getComputedStyle(articlesContainer).height.replace('px', ''));
        let isExpanded = false;
        
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
                articleIcon.style.display = '';
                articlesTitle.style.display = '';
            }
            if(isExpanded == false && e.propertyName == 'height')
                articlesContainer.style.display = 'none';
        });

        articlesContainer.addEventListener('mouseover', () => {
            articles.style.boxShadow = 'none';
        });
        articlesContainer.addEventListener('mouseleave', () => {
            articles.style.boxShadow = '';
        });
    }, []);

/* WORK IN PROGRESS-SCROLLING Articles */
useEffect(() => {
    const articles = document.getElementById('articles');
    const articlesContainer = document.getElementById('articles-container');
    const articlesTitle = document.getElementById('articles-title');
    const scrollPath = document.getElementById('scroll-path');
    const articlesScroll = document.getElementById('articles-scroll');
    let isClicked = 0, scroll = 0;
    let articlesContainerH = articlesContainer.offsetHeight, articlesH, articlesTitleH;
    let maxScroll, scrollH = articlesScroll.offsetHeight;
    let pixelEquivalent, padding = 20;
    
    articlesContainer.addEventListener('mousedown', () => {
        isClicked = 1;
        maxScroll = scrollPath.offsetHeight - scrollH;
        articlesH = articles.offsetHeight;
        articlesTitleH = articlesTitle.offsetHeight;
        pixelEquivalent = (articlesContainerH - articlesH + articlesTitleH + padding) / maxScroll;
    });
    articlesContainer.addEventListener('mousemove', (e) => {
        if(isClicked === 1) {
            scroll = scroll + e.movementY;
            if(-scroll >= maxScroll)
                scroll = -maxScroll;
            if(-scroll < 0)
                scroll = 0;
            articlesContainer.style.transform = `translateY(${scroll * pixelEquivalent}px)`;
            articlesTitle.style.transform = `translateY(${scroll * pixelEquivalent}px)`;
            /* FIX CALCULATION, FROM *2 TO PRECISE NUM */
            articlesScroll.style.transform = `translateY(${(-scroll)}px)`;
        }
    });
    window.addEventListener('mouseup', () => {
        isClicked = 0;
    });
}, []);

    return(
        <div id="articles">
            <FontAwesomeIcon icon={faFileLines} id="article-icon" />
            <div id="articles-title">
                Articles
            </div>
            <div id="articles-container">
                {articlesResponse.Articles.map((article, index) => {
                    return <Article article={article} key={index} />;
                })}
            </div>
            <Scroll />
        </div>
    )
}

export default Main;