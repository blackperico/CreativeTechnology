import { useEffect, useRef } from "react";

function FunkyBox({prop}) {
    const boxRef = useRef(null);
    const dropdownRef = useRef(null);
    const titleRef = useRef(null);
    const mainColor = prop.mainColor, hoverColor = prop.hoverColor, dropdownColor = prop.dropdownColor;
    
    useEffect(() => {
        const box = boxRef.current;
        const dropdown = dropdownRef.current;
        const title = titleRef.current;
        let isExpanded = false;
        const dropdownH = dropdown.offsetHeight, boxMargin = Number(getComputedStyle(box).marginBottom.replace('px', ''));
        
        box.style.backgroundColor = mainColor;
        dropdown.style.backgroundColor = dropdownColor;

        const hoverStyle = {
            hover: () => {
                box.style.backgroundColor = hoverColor;
                box.style.boxShadow = '0 0 5px rgb(0, 0, 0)';
            },
            reset: () => {
                box.style.backgroundColor = mainColor;
                box.style.boxShadow = '';
            }
        };
        const dropdownState = {
            active: () => {
                box.style.borderBottomLeftRadius = '0';
                box.style.borderBottomRightRadius = '0';
                dropdown.style.opacity = '1';
                dropdown.style.top = '50px';
                box.style.marginBottom = `${dropdownH + boxMargin}px`;
            },
            default: () => {
                box.style.borderBottomLeftRadius = '';
                box.style.borderBottomRightRadius = '';
                dropdown.style.opacity = '';
                dropdown.style.top = '';
                box.style.marginBottom = '';
            }
        };
    
        box.addEventListener('click', (e) => {
            if(isExpanded === false)
                {dropdownState.active();
                isExpanded = true;}
            else
                {dropdownState.default();
                isExpanded = false;}
        });
        box.addEventListener('mouseover', (e) => {
            if(e.target === box || title) 
                hoverStyle.hover();
            else
                hoverStyle.reset();
        });
        box.addEventListener('mouseleave', (e) => {
            hoverStyle.reset();
        });
    }, []);
    

    return (
        <div className="funky-box" ref={boxRef}>
            <p ref={titleRef}>{prop.title}</p>
            <div className="funky-dropdown" ref={dropdownRef}>

            </div>
        </div>
    )
};

export default FunkyBox;