import { useEffect, useRef, useState } from "react";

function MainRight() {
    const displayStates = {
        closed: "closed",
        opened: "opened"
    };
    const [displayState, setDisplayState] = useState(displayStates.closed);
    
    const popButtonRef = useRef(null);
    const mainRightRef = useRef(null);
    useEffect(() => {
        const popButton = popButtonRef.current;
        const mainRight = mainRightRef.current;
        let timeoutId;
        const expandWidth = window.innerWidth > 1250 ? '500px' : '300px';
    
        const hoverStates = {
            hover: 'hover',
            reset: 'reset'
        };
        function hoverStyles(state) {
            popButton.style.boxShadow = state === hoverStates.hover ? "0 0 15px #000" : '';
            mainRight.style.boxShadow = state === hoverStates.hover ? "0 0 10px #000" : '';
            mainRight.style.transition = state === hoverStates.hover ? "width 500ms" : '';
            mainRight.style.width = state === hoverStates.hover ? "60px" : '';
        }
    
        const handleClick = () => {
            if(displayState === displayStates.closed) {
                mainRight.style.width = expandWidth;
                setDisplayState(displayStates.opened);
            } else {
                mainRight.style.width = '';
                setDisplayState(displayStates.closed);
            }
        };
    
        const handleMouseOver = () => {
            if(displayState === displayStates.closed) {
                clearTimeout(timeoutId);
                hoverStyles(hoverStates.hover);
            }
        };
    
        const handleMouseLeave = () => {
            if(displayState === displayStates.closed) {
                timeoutId = setTimeout(() => {
                    hoverStyles(hoverStates.reset);
                }, 200);
            }
        };
    
        popButton.addEventListener('click', handleClick);
        popButton.addEventListener('mouseover', handleMouseOver);
        popButton.addEventListener('mouseleave', handleMouseLeave);
    
        return () => {
            popButton.removeEventListener('click', handleClick);
            popButton.removeEventListener('mouseover', handleMouseOver);
            popButton.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [displayState]);
    
    return(
        <div id="main-right" ref={mainRightRef}>
                <div id="content-box">
                    Aleksandar
                </div>
                
                <div id="pop-button" ref={popButtonRef}>

                </div>
            </div>
    )
}

export default MainRight;