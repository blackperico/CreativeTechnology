import '../styles/Home.css';
import { useEffect, useRef, useState } from 'react';
import userEvent from '@testing-library/user-event';
import Articles from '../components/Articles';
import FunkyBox from '../components/FunkyBox';
import MainRight from '../components/MainRight';

function Main() {
    const funkyBoxes = [
        {
            title: 'Top-sellers',
            mainColor: 'rgba(0, 255, 255, 1)',
            hoverColor: 'rgba(0, 255, 255, 0.6)',
            dropdownColor: 'rgba(0, 255, 255, 0.2)'
        },
        {
            title: 'Featured',
            mainColor: 'rgba(255, 0, 255, 1)',
            hoverColor: 'rgba(255, 0, 255, 0.6)',
            dropdownColor: 'rgba(255, 0, 255, 0.2)'
        },
        {
            title: 'Recommended',
            mainColor: 'rgba(255, 255, 0, 1)',
            hoverColor: 'rgba(255, 255, 0, 0.6)',
            dropdownColor: 'rgba(255, 255, 0, 0.2)'
        }
    ];

    return(
        <div id="main-container">
            <div id="main-left">
                <Articles />
            </div>
            <div id="main-middle">
                {funkyBoxes.map((funkyBox) => {
                    return <FunkyBox prop = {funkyBox} />
                })}
            </div>
            <MainRight />
        </div>
    )
}

export default Main;