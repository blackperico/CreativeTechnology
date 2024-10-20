import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef } from 'react';
import articlesResponse from '../articles.json';
import { isTouchScreen } from '../index.js';

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
    const containerWrapRef = useRef(null);

    const mousedown = isTouchScreen ? 'touchstart' : 'mousedown';
    const mouseup = isTouchScreen ? 'touchend' : 'mouseup';
    const mousemove = isTouchScreen ? 'touchmove' : 'mousemove';
    
    useEffect(() => {
        const scroll = scrollRef.current;
        const innerScroll = innerScrollRef.current;
        const articles = articlesRef.current;
        const icon = iconRef.current;
        const title = titleRef.current;
        const container = containerRef.current;
        const containerWrap = containerWrapRef.current;
        const mainLeft = document.getElementById('main-left');
        const navigation = document.getElementById('navigation');
        let navigationH = navigation.offsetHeight;
        const navigationMenu = document.getElementById('navigation-menu'), 
            navigationMenuH = navigationMenu.offsetHeight;
        const toggleElements = [title, title.firstChild, articles, icon, icon.firstChild];
        let fixValue = navigationH - navigationMenuH;

        function articlesExpandWidth() {
            const articlesLeft = Number(getComputedStyle(articles).left.replace('px', ''));
            const articlesPaddingL = Number(getComputedStyle(articles).paddingLeft.replace('px', ''));
            const articlesPaddingR = Number(getComputedStyle(articles).paddingRight.replace('px', ''));
            const totalSpace = (articlesLeft * 2) + articlesPaddingL + articlesPaddingR;
            
            return window.innerWidth < 630 ? window.innerWidth - totalSpace :  280;
        };
        let articlesExpandW = articlesExpandWidth();
        console.log(articlesExpandW);
        window.addEventListener('resize', () => {
            navigationH = navigation.offsetHeight;
            fixValue = navigationH - navigationMenuH;
            articlesExpandW = articlesExpandWidth();
        });
        
        const articlesPaddingsW = Number(getComputedStyle(articles).paddingLeft.replace('px', '')) + Number(getComputedStyle(articles).paddingRight.replace('px', '')),
            articlesShrinkW = 35;
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

        const articlesHeightPhones = {
            getHeight: function () {
                return window.innerHeight - articlesPaddingsW - navigationMenuH - Number(getComputedStyle(document.querySelector('#main-container')).marginTop.replace('px', ''));
            },
            setHeight: function () {
                articles.style.height = `${articlesHeightPhones.getHeight()}px`;
            }
        };

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
                        mainLeft.style.width = `${articlesExpandW + Number(getComputedStyle(articles).paddingLeft.replace('px', '')) + Number(getComputedStyle(articles).paddingRight.replace('px', '')) +( Number(getComputedStyle(articles).borderWidth.replace('px', '')) * 2)}px`;
                    }
                },
                phase2: () => {
                    phases.applyPhase(phases.expandPhase2.name);
                    if(window.innerHeight < 730) {
                        if(articlesContainerH > 700) {
                            articles.style.height = `${articlesHeightPhones.getHeight()}px`;
                            window.addEventListener('scroll', articlesHeightPhones.setHeight);
                        }
                        if(articlesContainerH < articlesHeightPhones.getHeight()) {
                            articles.style.height = `${articlesContainerH + title.offsetHeight + Number(getComputedStyle(articles).paddingTop.replace('px', ''))}px`;
                            scroll.style.display = 'none';
                        }
                    } else {
                        if(articlesContainerH > 700) {
                            articles.style.height = '700px';
                        }
                        else {
                            articles.style.height = `${articlesContainerH + title.offsetHeight + Number(getComputedStyle(articles).paddingTop.replace('px', ''))}px`;
                            scroll.style.display = 'none';
                        }
                    }
                }
            },
            shrink: {
                phase1: () => {
                    phases.applyPhase(phases.shrinkPhase1.name);
                    articles.style.transitionTimingFunction = 'cubic-bezier(1.0, 2.55, 0, 0.3)';
                    articles.style.height = `${articlesShrinkW}px`;
                    window.removeEventListener('scroll', articlesHeightPhones.setHeight);
                },
                phase2: () => {
                    phases.applyPhase(phases.shrinkPhase2.name);
                    articles.style.width = `${articlesShrinkW}px`;
                    icon.style.display = '';
                    title.style.display = '';
                    if(isFixed) {
                        mainLeft.style.transitionTimingFunction = 'cubic-bezier(1.0, 2.55, 0, 0.3)';
                        mainLeft.style.width = `${articlesShrinkW + articlesPaddingsW}px`;
                    }
                }
            }
        };
        
        articles.addEventListener(mousedown, (e) => {
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
            innerScroll.style.backgroundColor = 'rgb(255, 255, 255)';
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
        const scrollH = innerScroll.offsetHeight;
        let isClicked = 0, scrollValue = 0, firstTouch, movementArray = [];
        let articlesH, titleH;
        let maxScroll;
        let calcHeights, pixelEquivalent;
        function recalculateHeights() {
            return -Number(getComputedStyle(articles).paddingTop.replace('px', '')) - Number(getComputedStyle(containerWrap).top.replace('px', '')) + articlesH;
        };
        
        function moveIt(moveValue, wheelScroll) {
            if(moveValue === null)
                isClicked = 1;
            if(isClicked === 1) {
                scrollValue = wheelScroll === undefined ? scrollValue + moveValue : scrollValue + wheelScroll;
                if(-scrollValue >= maxScroll)
                    scrollValue = -maxScroll;
                if(-scrollValue < 0)
                    scrollValue = 0;
                container.style.transform = `translateY(${scrollValue * pixelEquivalent}px)`;
                innerScroll.style.transform = `translateY(${(-scrollValue)}px)`;
            }
            if(moveValue === null)
                isClicked = 0;
        };
        
        container.addEventListener(mousedown, (e) => {
            if(e.type === 'touchstart') {
                firstTouch = e.touches[0].screenY;
                e.preventDefault();
                innerScroll.style.backgroundColor = 'rgb(255, 255, 255)';
            }
            isClicked = 1;
            maxScroll = scroll.offsetHeight - scrollH;
            articlesH = articles.offsetHeight;
            titleH = title.offsetHeight;
            calcHeights = recalculateHeights();
            pixelEquivalent = (articlesContainerH - calcHeights) / maxScroll;
        });
        window.addEventListener(mousemove, (e) => {
            if(e.type === 'touchmove') {
                movementArray.push(e.touches[0].screenY);
                if(movementArray.length > 1)
                    moveIt(movementArray[movementArray.length - 1] - movementArray[movementArray.length - 2]);
            } else
            moveIt(e.movementY);
        });
        window.addEventListener(mouseup, (e) => {
            isClicked = 0;
            if(e.type === 'touchend') {
                movementArray = [];
                innerScroll.style.backgroundColor = '';
            }
        });
        articles.addEventListener('wheel', (e) => {
            e.preventDefault();
            maxScroll = scroll.offsetHeight - scrollH;
            articlesH = articles.offsetHeight;
            titleH = title.offsetHeight;
            calcHeights = recalculateHeights();
            pixelEquivalent = (articlesContainerH - calcHeights) / maxScroll;
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
                <i>Articles</i>
            </div>
            <div id="articles-container-wrap" ref={containerWrapRef}>
                <div id="articles-container" ref={containerRef}>
                    {articlesResponse.Articles.map((article, index) => {
                        return <Article article={article} key={index} />;
                    })}
                </div>
            </div>
            <div id="scroll-path" ref={scrollRef}>
                <div id="articles-scroll" ref={innerScrollRef}>

                </div>
            </div>
        </div>
    )
}

export default Main;