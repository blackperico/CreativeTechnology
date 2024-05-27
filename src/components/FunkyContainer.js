import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import '../styles/FunkyBox.css';
import { isTouchScreen } from '../index';

const scrollIndicatorValues = {
    left: 'left',
    right: 'right',
    both: 'both',
    none: 'none'
};
function scrollIndicator(target, side) {
    const leftIndicator = 'linear-gradient(90deg, rgba(0, 0, 0, 1) 0, rgba(0, 0, 0, 0.2) 15%, transparent 20%)';
    const rightIndicator = 'linear-gradient(270deg, rgba(0, 0, 0, 1) 0, rgba(0, 0, 0, 0.2) 15%, transparent 20%)';
    const bothIndicators = 'linear-gradient(90deg, rgba(0, 0, 0, 1) 0, rgba(0, 0, 0, 0.2) 15%, transparent 20%, transparent 85%, rgb(0, 0, 0) 100%)';
    const noneIndicators = '';

    if(side === 'left')
        target.style.backgroundImage = leftIndicator;
    if(side === 'right')
        target.style.backgroundImage = rightIndicator;
    if(side === 'both')
        target.style.backgroundImage = bothIndicators;
    if(side === 'none')
        target.style.backgroundImage = noneIndicators;
};
function iconDisplay(target, action) {
    if(action === 'show')
        target.style.display = 'block';
    if(action === 'hide')
        target.style.display = '';
};

function FunkyContainer({ products, overscrollColor, mainColor }) {
    const itemContainerRef = useRef(null);

    const buttonPress = isTouchScreen ? 'touchstart' : 'mousedown';
    const buttonRelease = isTouchScreen ? 'touchend' : 'mouseup';
    const buttonMove = isTouchScreen ? 'touchmove' : 'mousemove';

    useEffect(() => {
        const itemContainer = itemContainerRef.current;
        const funkyItems = Array.from(itemContainer.children);

        let itemH = funkyItems[0].offsetHeight, 
            itemW = funkyItems[0].offsetWidth;

        window.addEventListener('resize', () => {
            itemH = funkyItems[0].offsetHeight;
            itemW = funkyItems[0].offsetWidth;
        });
        
        for(let item of funkyItems) {
            item.addEventListener('mouseenter', () => {
                item.style.height = `${itemH + 12}px`;
                item.style.width = `${itemW + 12}px`;
                item.style.boxShadow = '0 0 10px #000';
            });
            item.addEventListener('mouseleave', () => {
                item.style.height = ``;
                item.style.width = ``;
                item.style.boxShadow = '';
            });
        }
    }, []);

    function FunkyItem({game}) {
        const picsContainerRef = useRef(null);
        const funkyPicsRef = useRef(null);
        const mainImageRef = useRef(null);
        const closeIconRef = useRef(null);
        const overscrollLeftRef = useRef(null);
        const overscrollRightRef = useRef(null);
        
        useEffect(() => {
            const closeIcon = closeIconRef.current;
            const mainImage = mainImageRef.current;
            const mainImageSrc = mainImage.getAttribute('src');

            closeIcon.addEventListener(buttonPress, () => {
                mainImage.src = mainImageSrc;
                iconDisplay(closeIcon, 'hide');
            });


            const picsContainer = picsContainerRef.current;
            const funkyPics = funkyPicsRef.current;
            let widthDiff = funkyPics.offsetWidth - picsContainer.offsetWidth + 10;
            let containerLeft = picsContainer.getBoundingClientRect().left, 
                containerRight = picsContainer.getBoundingClientRect().right;
            let picsLeft = funkyPics.getBoundingClientRect().left, 
                picsRight = funkyPics.getBoundingClientRect().right;

            if(funkyPics.offsetWidth > picsContainer.offsetWidth) {
                scrollIndicator(picsContainer, scrollIndicatorValues.right);
            }

            window.addEventListener('resize', () => {
                widthDiff = funkyPics.offsetWidth - picsContainer.offsetWidth + 10;
                containerLeft = picsContainer.getBoundingClientRect().left;
                containerRight = picsContainer.getBoundingClientRect().right;
                picsLeft = funkyPics.getBoundingClientRect().left;
                picsRight = funkyPics.getBoundingClientRect().right;

                if(picsLeft < containerLeft) {
                    if(picsRight > containerRight) {
                        scrollIndicator(picsContainer, scrollIndicatorValues.both);
                    } else {
                        scrollIndicator(picsContainer, scrollIndicatorValues.left);
                    }
                } else if(picsRight > containerRight) {
                    scrollIndicator(picsContainer, scrollIndicatorValues.right);
                }
            });
            /* ADD: call scrollIndicator on drag */
            /* Work out dragging: 
            0. MIN/MAX VALUE
            1. scrollIndiactor() calls
            2. ....overscroll.... 
            3. drag cant be passed as parameter to overscrollDrag()
                -create separate variables for left & right overscroll
                -left one is passed with condition that drag === widthDiff where it starts count
                -right one uses drag
                -set max widths
                -work out borders:
                    depending on vertical drag movement borders are changing
                    -create dragVertical variable */
            const overscrollLeft = overscrollLeftRef.current;
            const overscrollRight = overscrollRightRef.current;
            let overscrollValue = 0;
            let dragVertical = 0;
            let drag = 0;

            function overscrollDrag(target, value, event) {
                if(event) {
                    const movementY = event instanceof TouchEvent ? movementArrayY[movementArrayY.length - 1] - movementArrayY[movementArrayY.length - 2] : event.movementY;
                    /* Vertical movement */
                    dragVertical = dragVertical + movementY;
                    if(dragVertical > 0 && dragVertical <= 25) {
                        if(target === overscrollLeft)
                            target.style.borderTopRightRadius = `${dragVertical}px`;
                        if(target === overscrollRight)
                            target.style.borderTopLeftRadius = `${dragVertical}px`;
                    }
                    if(dragVertical < 0 && dragVertical >= -25) {
                        if(target === overscrollLeft)
                            target.style.borderBottomRightRadius = `${-dragVertical}px`;
                        if(target === overscrollRight)
                            target.style.borderBottomLeftRadius = `${-dragVertical}px`;
                    }
                        
                }
                if(value <= 45)
                    target.style.width = `${value}px`;
                if(value === 0) {
                    /* Reset */
                    overscrollLeft.style.borderTopRightRadius = '';
                    overscrollLeft.style.borderBottomRightRadius = '';
                    overscrollRight.style.borderTopLeftRadius = '';
                    overscrollRight.style.borderBottomLeftRadius = '';
                }

            };
            
            let movementArrayX = [], movementArrayY = [];
            function dragAndIndicator(e) {
                if(e instanceof TouchEvent) {
                    movementArrayX.push(e.touches[0].clientX);
                    movementArrayY.push(e.touches[0].clientY);
                }
                const movementX = e instanceof TouchEvent ? movementArrayX[movementArrayX.length - 1] - movementArrayX[movementArrayX.length - 2] : e.movementX;
                
                picsLeft = funkyPics.getBoundingClientRect().left;
                picsRight = funkyPics.getBoundingClientRect().right;
                containerLeft = picsContainer.getBoundingClientRect().left;
                containerRight = picsContainer.getBoundingClientRect().right;
            
                if(picsLeft < containerLeft && picsRight > containerRight)
                    scrollIndicator(picsContainer, scrollIndicatorValues.both);
                else if(picsLeft < containerLeft)
                    scrollIndicator(picsContainer, scrollIndicatorValues.left);
                else if(picsRight > containerRight)
                    scrollIndicator(picsContainer, scrollIndicatorValues.right);
                else 
                    scrollIndicator(picsContainer, scrollIndicatorValues.none);

                if(drag > 0) {
                    switch(true) {
                        case drag < 10:
                            drag = drag + (movementX / 5);
                            break;
                        case drag < 15:
                            drag = drag + (movementX / 15);
                            break;
                        case drag < 20:
                            drag = drag + (movementX / 20);
                            break;
                        default:
                            drag = drag + (movementX / 25);
                            break;
                    }    

                    overscrollDrag(overscrollLeft, drag, e);   
                } else 
                if(drag < -widthDiff) {
                    switch(true) {
                        case drag > (-widthDiff - 10):
                            drag = drag + (movementX / 5);
                            break;
                        case drag > (-widthDiff - 15):
                            drag = drag + (movementX / 7.5);
                            break;
                        case drag > (-widthDiff - 20):
                            drag = drag + (movementX / 10);
                            break;
                        default:
                            drag = drag + (movementX / 15);
                            break;
                    }

                    overscrollValue = -(widthDiff + drag);
                    overscrollDrag(overscrollRight, overscrollValue, e);
                }

                if(drag <= 0 && drag >= -widthDiff) {
                    drag = drag + movementX / 1.5;
                    funkyPics.style.transform = `translateX(${drag}px)`;
                }
            };

            if(funkyPics.offsetWidth > picsContainer.offsetWidth) {
                funkyPics.addEventListener(buttonPress, (e) => {
                    e.preventDefault();
                    if(e instanceof TouchEvent) {
                        movementArrayX.push(e.touches[0].clientX);
                        movementArrayY.push(e.touches[0].clientY);
                    }
                    overscrollLeft.style.transition = '';
                    overscrollRight.style.transition = '';
                    window.addEventListener(buttonMove, dragAndIndicator);
                });
                window.addEventListener(buttonRelease, (e) => {
                    if(e instanceof TouchEvent) {
                        movementArrayX = [];
                        movementArrayY = [];
                    }
                    overscrollValue = 0;
                    dragVertical = 0;
    
                    if(drag > 0)
                        drag = 0;
                    if(-drag > widthDiff)
                        drag = -widthDiff;
    
                    overscrollLeft.style.transition = '650ms';
                    overscrollRight.style.transition = '650ms';
                    overscrollDrag(overscrollLeft, 0);
                    overscrollDrag(overscrollRight, 0);
                    window.removeEventListener(buttonMove, dragAndIndicator);
                });
            }
        }, []);

        function RenderImg(image) {
            const funkyPicRef = useRef(null);

            useEffect(() => {
                const mainImage = mainImageRef.current;
                const funkyPic = funkyPicRef.current;
                const closeIcon = closeIconRef.current;
                let clickTime;

                funkyPic.addEventListener(buttonPress, (e) => {
                    clickTime = e.timeStamp;
                });
                funkyPic.addEventListener(buttonRelease, (e) => {
                    if(e.timeStamp - clickTime < 300) {
                        mainImage.src = funkyPic.getAttribute('src');
                        iconDisplay(closeIcon, 'show');
                    }
                });
            }, []);

            return(
                <img src={require(`../funkybox/images/${image.img}`)} 
                    draggable='false'
                    className="funky-pic"
                    ref={funkyPicRef}>
                </img>
            )
        };
        
        return(
            <div className="funky-item">
                <div className="funky-item-header">

                    <FontAwesomeIcon icon={faXmark} className="xMark" ref={closeIconRef} />

                    <img src={require(`../funkybox/images/${game.mainImage}`)} 
                        draggable='false' 
                        className="funky-item-img"
                        ref={mainImageRef}>
                    </img>

                    <div className="funky-pics-container" ref={picsContainerRef}>
                        <div className="overscroll-left" style={{backgroundColor: overscrollColor}} ref={overscrollLeftRef}/>

                        <div className="funky-pics" ref={funkyPicsRef}>
                            {game.images.map((image) => {
                                return <RenderImg img={image} />
                            })}
                        </div>

                        <div className="overscroll-right" style={{backgroundColor: overscrollColor}} ref={overscrollRightRef}/>
                    </div>

                </div>
                <div className="funky-item-footer">
                    <div className="funky-item-title">
                        {game.title}
                    </div>
                    
                    <div className="funky-item-tags">
                        {game.tags.map((tag) => {
                            return <p className="funky-item-tag">
                                {tag}
                            </p>
                        })}
                        <p className="funky-item-review">Reviews: ({game.reviews}%)</p>
                    </div>

                    <button className="funky-item-buy" style={{backgroundColor: mainColor}}>
                        <p>Buy</p>
                        <div className={game.discount !== null ? "funky-item-price discount" : "funky-item-price"}>
                            <p style={game.discount !== null ? {color: '#787878', fontSize: '14px'} : {color: 'inherit'}}>
                                {game.price}
                            </p>
                            {game.discount !== null ?
                            <>
                                <p className="discount-percentage">{game.discount + '%'}</p>
                                <p className="new-price">{(game.price * (1 - game.discount / 100)).toFixed(2)}</p>
                            </>
                            :
                            ''}
                        </div>
                    </button>
                </div>
            </div>
        )
    };

    return(
        <div className="funky-items-container" ref={itemContainerRef}>
            {products.map((product) => {
                return <FunkyItem game={product} />
            })}
        </div>
    )
};

export default FunkyContainer;