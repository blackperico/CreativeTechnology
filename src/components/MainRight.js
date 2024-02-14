import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from "react";
import userEvent from '@testing-library/user-event';

/* TO DO: for phones-dragging towards left opens slideContainer 
    maybe change state to useReducer */
function MainRight() {
    const popButtonRef = useRef(null);
    const mainRightRef = useRef(null);
    const slideContainerRef = useRef(null);
    const buttonIconRef = useRef(null);
    
    const DISPLAYSTATES = {
        closed: "closed",
        opened: "opened"
    };
    const [displayState, setDisplayState] = useState(DISPLAYSTATES.closed);
    const displayStateRef = useRef(displayState);
    const _setDisplayState = (newState) => {
        displayStateRef.current = newState;
        setDisplayState(newState);
    };

    useEffect(() => {
        const popButton = popButtonRef.current;
        const mainRight = mainRightRef.current;
        const slideContainer = slideContainerRef.current;
        const buttonIcon = buttonIconRef.current;

        const navigationMenu = document.getElementById('navigation-menu');
        const navHeight = navigationMenu.offsetHeight;
        let timeoutId;
        const expandWidth = window.innerWidth > 1250 ? '500px' : '300px';

        function checkPosition() {
            const mainRightRect = mainRight.getBoundingClientRect();

            if(mainRightRect.top <= navHeight) {
                slideContainer.style.height = `${window.innerHeight - navHeight}px`;
                slideContainer.style.top = `${(window.innerHeight - slideContainer.offsetHeight + navHeight) / 2}px`;
            }
            else {
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
            const transition = getComputedStyle(slideContainer).transition;

            popButton.style.boxShadow = state === HOVERSTATES.hover ? "0 0 15px #000" : '';
            slideContainer.style.boxShadow = state === HOVERSTATES.hover ? "0 0 10px #000" : '';
            slideContainer.style.transition = state === HOVERSTATES.hover ? transition.replace(/width [^,;]+/, 'width 1000ms') : '';
            if(displayStateRef.current === DISPLAYSTATES.closed)
                slideContainer.style.width = state === HOVERSTATES.hover ? "65px" : '';
        };
    
        const handleClick = () => {
            if(displayStateRef.current === DISPLAYSTATES.closed) {
                slideContainer.style.width = expandWidth;
                _setDisplayState(DISPLAYSTATES.opened);
                buttonIcon.style.transform = 'rotate(180deg)';
            } else {
                slideContainer.style.width = '';
                _setDisplayState(DISPLAYSTATES.closed);
                buttonIcon.style.transform = '';
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

        window.addEventListener('scroll', checkPosition);
        popButton.addEventListener('click', handleClick);
        popButton.addEventListener('mouseenter', handleMouseEnter);
        popButton.addEventListener('mouseleave', handleMouseLeave);
    
        return () => {
            window.removeEventListener('scroll', checkPosition);
            popButton.removeEventListener('click', handleClick);
            popButton.removeEventListener('mouseover', handleMouseEnter);
            popButton.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);
    
    return(
        <div id="main-right" ref={mainRightRef}>
            <div id="slide-container" ref={slideContainerRef}>
                <div id="content-box">
                    Aleksandar
                </div>
                
                <div id="pop-button" ref={popButtonRef}>
                    <FontAwesomeIcon icon={faChevronLeft} 
                        id='button-icon'
                        style={{color: "rgb(35, 35, 35)", width: '100%', height: '100%'}} 
                        ref={buttonIconRef} />
                </div>

                <div id="content-box2">
                    Aco
                </div>
            </div>
        </div>
    )
}

export default MainRight;