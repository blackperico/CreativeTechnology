import { useEffect, useRef } from "react";
import '../styles/FunkyBox.css';
import FunkyContainer from "./FunkyContainer";

function FunkyBox({prop}) {
    const boxRef = useRef(null);
    const titleRef = useRef(null);
    const dropdownRef = useRef(null);

    const mainColor = prop.mainColor,
        hoverColor = prop.hoverColor,
        dropdownColor = prop.dropdownColor;
        // ADD COLORS: overscroll and scroll indicator
    const products = prop.json;
    
    useEffect(() => {
        const box = boxRef.current;
        const title = titleRef.current;
        const dropdown = dropdownRef.current;
        let isExpanded = false;

        box.style.backgroundColor = mainColor;
        dropdown.style.backgroundColor = dropdownColor;

        const boxH = box.offsetHeight,
            boxMargin = Number(getComputedStyle(box).marginBottom.replace('px', ''));
        let dropdownH = dropdown.offsetHeight;

        window.addEventListener('resize', () => {
            if(dropdownH !== dropdown.offsetHeight) {
                dropdownH = dropdown.offsetHeight;
                if(isExpanded)
                    dropdownStyles.open();
            }
        });

        const hoverStyles = {
            active: () => {
                box.style.backgroundColor = hoverColor;
                box.style.boxShadow = '0 0 5px #000';
            },
            default: () => {
                box.style.backgroundColor = mainColor;
                box.style.boxShadow = '';
            }
        };
        const dropdownStyles = {
            open: () => {
                dropdown.style.zIndex = '1';
                dropdown.style.opacity = '1';
                dropdown.style.top = `${boxH}px`;
                box.style.borderBottomLeftRadius = '0';
                box.style.borderBottomRightRadius = '0';
                box.style.marginBottom = `${dropdownH + boxMargin}px`;
                isExpanded = true;
            },
            close: () => {
                dropdown.style.zIndex = '-1';
                dropdown.style.opacity = '0';
                dropdown.style.top = '-200px';
                box.style.borderRadius = '25px';
                box.style.marginBottom = '15px';
                isExpanded = false;
            }
        };
        dropdownStyles.open();

        function expandSwitch(e) {
            if(e.target === title || e.target === box) {
                if(isExpanded === false)
                    dropdownStyles.open();
                else
                    dropdownStyles.close();
            }
        };

        box.addEventListener('click', expandSwitch);
        box.addEventListener('mouseover', (e) => {
            if(e.target === box || e.target === title) 
                hoverStyles.active();
            else
                hoverStyles.default();
        });
        box.addEventListener('mouseleave', (e) => {
            hoverStyles.default();
        });
    }, []);
    

    return (
        <div className="funky-box" ref={boxRef}>
            <p ref={titleRef}>{prop.title}</p>
            <div className="funky-dropdown" ref={dropdownRef}>
                <FunkyContainer products={products} overscrollColor={hoverColor} mainColor={mainColor} />
            </div>
        </div>
    )
};

export default FunkyBox;