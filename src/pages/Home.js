import '../styles/Home.css';
import { useEffect, useRef, useState } from 'react';
import userEvent from '@testing-library/user-event';
import Articles from '../components/Articles';
import FunkyBox from '../components/FunkyBox';
import MainRight from '../components/MainRight';

function Main() {
    const funkyBoxColors = {
        one: ['rgba(0, 255, 255, 1)', 'rgba(0, 255, 255, 0.6)', 'rgba(0, 255, 255, 0.2)'],
        two: ['rgba(255, 0, 255, 1)', 'rgba(255, 0, 255, 0.6)', 'rgba(255, 0, 255, 0.2)'],
        three: ['rgba(255, 255, 0, 1)', 'rgba(255, 255, 0, 0.6)', 'rgba(255, 255, 0, 0.2)']
    };

    return(
        <div id="main-container">
            <div id="main-left">
                <Articles />
            </div>
            <div id="main-middle">
                <FunkyBox colors = {funkyBoxColors.one} title = 'Top-sellers' />
                <FunkyBox colors = {funkyBoxColors.two} title = 'Featured' />
                <FunkyBox colors = {funkyBoxColors.three} title = 'Recommended' />
            </div>
            <MainRight />
        </div>
    )
}

export default Main;