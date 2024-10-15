import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from "react";
import { isTouchScreen } from '../index';
import jsonData from '../mainright/content.json';

function MainRight() {
    const mainRightRef = useRef(null);
    const slideContainerRef = useRef(null);
    const buttonContainerRef = useRef(null);
    const buttonIconRef = useRef(null);
    const slideWrapRef = useRef(null);
    const slideContentRef = useRef(null);
    const slideMenuRef = useRef(null);

    const DISPLAYSTATES = {
        open: 'open',
        close: 'close'
    };
    const CONTENTSTATES = {
        specialOffers: 'special offers',
        news: 'news',
        changelog: 'changelog'
    };
    const [displayState, setDisplayState] = useState(DISPLAYSTATES.close);
    const [contentState, setContentState] = useState(CONTENTSTATES.specialOffers);

    function SlideContent() {
        const {[contentState] : contentItems} = jsonData.find(content => content[contentState]);
        
        function renderContent() {
            switch(contentState) {
                case CONTENTSTATES.specialOffers:
                    return <SpecialOffers contentItems = {contentItems} />
                case CONTENTSTATES.news:
                case CONTENTSTATES.changelog:
                    return <DefaultContent contentItems = {contentItems} />
                default:
                    return <div>Error: loading content.</div>
            }
        };
 
        return (
            <div id="slide-content" ref={slideContentRef}>
                {renderContent()}
            </div>
        )
    };

    function SpecialOffers({ contentItems }) {
        
        return (
            contentItems.map((contentItem, index) => {
                const {
                    'offer-type': offerType,
                    'time-until': timeUntil,
                    price,
                    'discount-percentage': discountPercentage,
                    img
                } = contentItem;
                const finalPrice = price - (price * (discountPercentage / 100));
                const targetTime = new Date(timeUntil);
                const diffMs = targetTime - new Date();
                const diffMinutes = Math.floor(diffMs / (1000 * 60));
                const hours = Math.floor(diffMinutes / 60);
                const minutes = diffMinutes % 60;

                return (
                    <div id="content-item" key={index}>
                        <img id="content-item-img" src={require(`../mainright/images/${img}`)} draggable={false} alt={img}>
                        </img>
                        <div id="content-info-wrap">
                            <p id="offer-type">
                                {offerType}
                            </p>
                            <p id="offer-time">
                                {`Time left: ${hours}h ${minutes}m`}
                            </p>
                            <div id="offer-discount-wrap">
                                <div id="discount-percentage">
                                    {discountPercentage + '%'}
                                </div>
                                <div id="discount-prices">
                                    <div id="discount-original-price">
                                        {price + '€'}
                                    </div>
                                    <div id="discount-final-price">
                                        {finalPrice.toFixed(2) + "€"}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        )
    };
    
    function DefaultContent({ contentItems }) {

        return (
            <>
                {contentItems.map((contentItem, index) => {
                    const {
                        img,
                        title
                    } = contentItem;

                    return (
                        <div id="content-item" key={index}>
                            <img id="content-item-img-full" src={require(`../mainright/images/${img}`)} draggable={false} alt={img}>
                            </img>
                            <p id="content-item-title">
                                {title}
                            </p>
                        </div>
                    )
                })}
            </>
        )
    };

    useEffect(() => {
        const mainRight = mainRightRef.current;
        const slideContainer = slideContainerRef.current;
        const buttonContainer = buttonContainerRef.current;
        const buttonIcon = buttonIconRef.current;
        const navigationMenu = document.getElementById('navigation-menu');

        const navHeight = navigationMenu.offsetHeight;
        let timeoutId;

        if(displayState === DISPLAYSTATES.open) {
            slideContainer.classList.add('open');
            buttonIcon.classList.add('open');
        } else {
            slideContainer.classList.remove('open');
            buttonIcon.classList.remove('open');
        }

        function checkPosition() {
            const mainRightRect = mainRight.getBoundingClientRect();

            if(mainRightRect.top <= navHeight) {
                slideContainer.style.top = `${(window.innerHeight - slideContainer.offsetHeight + navHeight) / 2}px`;
                slideContainer.style.height = `${window.innerHeight - navHeight}px`;
            } else {
                slideContainer.style.top = `${mainRightRect.top}px`;
                slideContainer.style.height = `${window.innerHeight - mainRightRect.top}px`;
            }
        };
        checkPosition();

        const HOVERSTATES = {
            hover: 'hover',
            reset: 'reset'
        };
        function hoverStyles(state) {
            if(state === HOVERSTATES.hover) {
                buttonIcon.querySelector('path').classList.add('hover');
                if(displayState === DISPLAYSTATES.close)
                    slideContainer.classList.add('hover-closed');
                else
                    slideContainer.classList.add('hover-opened');
            } else {
                buttonIcon.querySelector('path').classList.remove('hover');
                slideContainer.classList.remove('hover-closed');
                slideContainer.classList.remove('hover-opened');
            }
        };

        const handleMouseEnter = () => {
            clearTimeout(timeoutId);
            hoverStyles(HOVERSTATES.hover);
        };
        const handleMouseLeave = () => {
            timeoutId = setTimeout(() => {
                hoverStyles(HOVERSTATES.reset);
            }, 200);
        };
        const handleClick = () => {
            if(displayState === DISPLAYSTATES.close) {
                slideContainer.classList.remove('hover-closed');
                setDisplayState(DISPLAYSTATES.open);
            }
            if(displayState === DISPLAYSTATES.open)
                setDisplayState(DISPLAYSTATES.close);
        };
        
        let firstTouch, lastTouch, currentTransform;
        const handleTouchStart = (e) => {
            if(e.target !== buttonIcon && e.target !== buttonContainer && e.target !== buttonIcon.querySelector('path')) {
                const slideContainerX = slideContainer.getBoundingClientRect().x;
                const touchX = e.touches[0].clientX;
                firstTouch = touchX;

                if(displayState === DISPLAYSTATES.close && slideContainerX - touchX <= 100) {
                    e.preventDefault();
                    hoverStyles(HOVERSTATES.hover);
                    currentTransform = Number(getComputedStyle(slideContainer).transform.split(',')[4].trim());
                    window.addEventListener('touchmove', handleTouchMove);
                }
                if(displayState === DISPLAYSTATES.open && slideContainerX - touchX <= 100 && slideContainerX - touchX >= -100) {
                    e.preventDefault();
                    hoverStyles(HOVERSTATES.hover);
                    currentTransform = Number(getComputedStyle(slideContainer).transform.split(',')[4].trim());
                    window.addEventListener('touchmove', handleTouchMove);
                }
            }
        };
        const handleTouchEnd = () => {
            window.removeEventListener('touchmove', handleTouchMove);
            hoverStyles(HOVERSTATES.reset);
            slideContainer.style.transform = '';
            slideContainer.classList.remove('touch-move');
            if(lastTouch !== undefined) {
                if(displayState === DISPLAYSTATES.close) {
                    if(firstTouch - lastTouch >= 100)
                        setDisplayState(DISPLAYSTATES.open);
                }
                if(displayState === DISPLAYSTATES.open) {
                    if(firstTouch - lastTouch <= -100)
                        setDisplayState(DISPLAYSTATES.close);
                }
            }
        };
        const handleTouchMove = (e) => {
            lastTouch = e.touches[0].clientX;
            slideContainer.classList.add('touch-move');
            slideContainer.style.transform = `translateX(${currentTransform - (firstTouch - lastTouch)}px)`;
        };

        if(isTouchScreen) {
            window.addEventListener('touchstart', handleTouchStart, { passive: false });
            window.addEventListener('touchend', handleTouchEnd);
        }
        buttonIcon.addEventListener('mouseenter', handleMouseEnter);
        buttonIcon.addEventListener('mouseleave', handleMouseLeave);
        buttonIcon.addEventListener('click', handleClick);
        window.addEventListener('scroll', checkPosition);
        window.addEventListener('resize', checkPosition);
    
        return () => {
            if(isTouchScreen) {
                window.removeEventListener('touchstart', handleTouchStart);
                window.removeEventListener('touchend', handleTouchEnd);
            }
            buttonIcon.removeEventListener('mouseenter', handleMouseEnter);
            buttonIcon.removeEventListener('mouseleave', handleMouseLeave);
            buttonIcon.removeEventListener('click', handleClick);
            window.removeEventListener('scroll', checkPosition);
            window.removeEventListener('resize', checkPosition);
        };
    }, [displayState]);

    useEffect(() => {
        function checkHeight() {
            const slideContainer = slideContainerRef.current;
            const slideWrap = slideWrapRef.current;
            const slideContent = slideContentRef.current;
            const contentItems = slideContent.querySelectorAll('#content-item');

            const isTiny = slideContainer.offsetHeight < 495 || window.innerWidth <= 714;

            slideContent.classList.toggle('tiny', isTiny);
            slideWrap.classList.toggle('tiny', isTiny);
            contentItems.forEach((element) => {
                element.classList.toggle('tiny', isTiny);
            });
        };
        checkHeight();

        window.addEventListener('resize', checkHeight);
        window.addEventListener('scroll', checkHeight);

        return () => {
            window.removeEventListener('resize', checkHeight);
            window.addEventListener('scroll', checkHeight);
        }
    }, [contentState]);
    
    return(
        <div id="main-right" ref={mainRightRef}>
            <div id="slide-container" ref={slideContainerRef}>

                <div id="slide-background">
                </div>

                <div id="slide-button-container" ref={buttonContainerRef}>
                    <FontAwesomeIcon icon={faChevronLeft}
                        id='button-icon'
                        ref={buttonIconRef} />
                </div>

                <div id="slide-wrap" ref={slideWrapRef}>
                    <ul id="slide-menu" ref={slideMenuRef}>
                        <li id="slide-menu-item" onClick={() => setContentState(CONTENTSTATES.specialOffers)}>Special Offers</li>
                        <li id="slide-menu-item" onClick={() => setContentState(CONTENTSTATES.news)}>News</li>
                        <li id="slide-menu-item" onClick={() => setContentState(CONTENTSTATES.changelog)}>Changelog</li>
                    </ul>
                    <SlideContent />
                </div>

            </div>
        </div>
    )
}

export default MainRight;