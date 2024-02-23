import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef } from 'react';
import articlesResponse from '../articles.json';

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

function Main() {
    const scrollRef = useRef(null);
    const innerScrollRef = useRef(null);
    const articlesRef = useRef(null);
    const iconRef = useRef(null);
    const titleRef = useRef(null);
    const containerRef = useRef(null);
    
    useEffect(() => {
        const scroll = scrollRef.current;
        const innerScroll = innerScrollRef.current;
        const articles = articlesRef.current;
        const icon = iconRef.current;
        const title = titleRef.current;
        const container = containerRef.current;
        const mainLeft = document.getElementById('main-left');
        const navigation = document.getElementById('navigation'), navigationH = navigation.offsetHeight;
        const navigationMenu = document.getElementById('navigation-menu'), navigationMenuH = navigationMenu.offsetHeight;
        
        const toggleElements = [title, articles, icon, icon.firstChild];
        const fixValue = navigationH - navigationMenuH;
        const articlesExpandW = 260, articlesExtraPadding = 36, articlesShrinkW = 35;
        const articlesContainerH = Number(getComputedStyle(container).height.replace('px', ''));
        let isFixed;

        function fixIt(action) {
            mainLeft.style.height = action === 'fix' ? `${articles.offsetHeight}px` : '';
            mainLeft.style.width = action === 'fix' ? `${articles.offsetWidth}px` : '';
            articles.style.position = action === 'fix' ? 'fixed' : '';
            articles.style.top = action === 'fix' ? '60px' : '';
            isFixed = action === 'fix' ? true : false;
        };
        fixIt(window.scrollY >= fixValue ? 'fix' : 'reset');

        window.addEventListener('scroll', () => {
            if(window.scrollY >= fixValue && isFixed !== true) {
                fixIt('fix');
            }
            if(window.scrollY < fixValue && isFixed === true)
                fixIt('reset');
        });

        let currentPhase = null;
        const phases = {
            expandPhase1: {
                value: false,
                name: 'expandPhase1'
            },
            expandPhase2: {
                value: false,
                name: 'expandPhase2'
            },
            shrinkPhase1: {
                value: false,
                name: 'shrinkPhase1'
            },
            shrinkPhase2: {
                value: false,
                name: 'shrinkPhase2'
            },
            applyPhase: function applyPhase(applyKey) {
                for(let key in this)
                    if(typeof this[key] !== 'function')
                        if(this[key].name !== applyKey.name)
                            this[key].value = false;
                        else
                            this[key].value = true;
                currentPhase = applyKey;
            }
        };
        const toggleActions = {
            expand: {
                phase1: () => {
                    phases.applyPhase(phases.expandPhase1.name);
                    articles.style.transitionTimingFunction = 'cubic-bezier(0.5, 2.0, 0.5, 1)';
                    articles.style.width = `${articlesExpandW}px`;
                    icon.style.display = 'none';
                    container.style.display = 'block';
                    title.style.display = 'block';
                    if(isFixed) {
                        mainLeft.style.transitionTimingFunction = 'cubic-bezier(0.5, 2.0, 0.5, 1)';
                        mainLeft.style.width = `${articlesExpandW + articlesExtraPadding}px`;
                    }
                },
                phase2: () => {
                    phases.applyPhase(phases.expandPhase2.name);
                    if(articlesContainerH > 700)
                        articles.style.height = '700px';
                    else {
                        articles.style.height = `${articlesContainerH + 25}px`;
                        scroll.style.display = 'none';
                    }
                }
            },
            shrink: {
                phase1: () => {
                    phases.applyPhase(phases.shrinkPhase1.name);
                    articles.style.transitionTimingFunction = 'cubic-bezier(1.0, 2.55, 0, 0.3)';
                    articles.style.height = `${articlesShrinkW}px`;
                },
                phase2: () => {
                    phases.applyPhase(phases.shrinkPhase2.name);
                    articles.style.width = `${articlesShrinkW}px`;
                    icon.style.display = '';
                    title.style.display = '';
                    if(isFixed) {
                        mainLeft.style.transitionTimingFunction = 'cubic-bezier(1.0, 2.55, 0, 0.3)';
                        mainLeft.style.width = `${articlesShrinkW + articlesExtraPadding}px`;
                    }
                }
            }
        };
        
        articles.addEventListener('click', (e) => {
            if(toggleElements.includes(e.target)) {
                switch(currentPhase) {
                    case null: 
                        toggleActions.expand.phase1();
                        break;
                    case phases.shrinkPhase2.name:
                        toggleActions.expand.phase1();
                        break;
                    case phases.shrinkPhase1.name:
                        toggleActions.expand.phase2();
                        break;
                    case phases.expandPhase2.name:
                        toggleActions.shrink.phase1();
                        break;
                    case phases.expandPhase1.name:
                        toggleActions.shrink.phase2();
                        break;
                }
            }
        });
        articles.addEventListener('transitionend', (e) => {
            if(e.propertyName === 'width' && currentPhase === phases.expandPhase1.name)
                toggleActions.expand.phase2();
            if(e.propertyName === 'height' && currentPhase === phases.shrinkPhase1.name)
                toggleActions.shrink.phase2();
        });

        container.addEventListener('mouseenter', () => {
            articles.style.boxShadow = 'none';
            innerScroll.style.backgroundColor = 'rgb(14, 14, 14)';
            innerScroll.style.boxShadow = '0 0 3px rgb(25, 25, 25)';
        });
        container.addEventListener('mouseleave', () => {
            articles.style.boxShadow = '';
            innerScroll.style.backgroundColor = '';
            innerScroll.style.boxShadow = '';
        });
        scroll.addEventListener('mouseenter', () => {
            articles.style.boxShadow = 'none';
        });
        scroll.addEventListener('mouseleave', () => {
            articles.style.boxShadow = '';
        });
    /* SCROLLING FUNCTIONALITY */
        let isClicked = 0, scrollValue = 0;
        let articlesH, articlesTitleH;
        let maxScroll, scrollH = innerScroll.offsetHeight;
        let pixelEquivalent, padding = 20;
        
        function moveIt(e, wheelScroll) {
            if(e === null)
                isClicked = 1;
            if(isClicked === 1) {
                scrollValue = wheelScroll === undefined ? scrollValue + e.movementY : scrollValue + wheelScroll;
                if(-scrollValue >= maxScroll)
                    scrollValue = -maxScroll;
                if(-scrollValue < 0)
                    scrollValue = 0;
                container.style.transform = `translateY(${scrollValue * pixelEquivalent}px)`;
                title.style.transform = `translateY(${scrollValue * pixelEquivalent}px)`;
                innerScroll.style.transform = `translateY(${(-scrollValue)}px)`;
            }
            if(e === null)
                isClicked = 0;
        };

        container.addEventListener('mousedown', () => {
            isClicked = 1;
            maxScroll = scroll.offsetHeight - scrollH;
            articlesH = articles.offsetHeight;
            articlesTitleH = title.offsetHeight;
            pixelEquivalent = (articlesContainerH - articlesH + articlesTitleH + padding) / maxScroll;
        });
        window.addEventListener('mousemove', moveIt);
        window.addEventListener('mouseup', () => {
            isClicked = 0;
        });
        articles.addEventListener('wheel', (e) => {
            e.preventDefault();
            maxScroll = scroll.offsetHeight - scrollH;
            articlesH = articles.offsetHeight;
            articlesTitleH = title.offsetHeight;
            pixelEquivalent = (articlesContainerH - articlesH + articlesTitleH + padding) / maxScroll;
            if(e.deltaY == '-100')
                moveIt(null, 40);
            if(e.deltaY == '100')
                moveIt(null, -40);
        });
}, []);

    return(
        <div id="articles" ref={articlesRef}>
            <FontAwesomeIcon icon={faFileLines} id="article-icon" ref={iconRef}/>
            <div id="articles-title" ref={titleRef}>
                Articles
            </div>
            <div id="articles-container" ref={containerRef}>
                {articlesResponse.Articles.map((article, index) => {
                    return <Article article={article} key={index} />;
                })}
            </div>
            <div id="scroll-path" ref={scrollRef}>
                <div id="articles-scroll" ref={innerScrollRef}>

                </div>
            </div>
        </div>
    )
}

export default Main;