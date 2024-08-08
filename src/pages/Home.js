import '../styles/Home.css';
import Articles from '../components/Articles';
import FunkyBox from '../components/FunkyBox';
import MainRight from '../components/MainRight';
import featured from '../funkybox/featured.json';
import topsellers from '../funkybox/topsellers.json';
import recommended from '../funkybox/recommended.json';
import { Helmet } from 'react-helmet';

function Main() {
    const funkyBoxes = [
        {
            title: 'Top-sellers',
            mainColor: 'rgba(0, 255, 255, 1)',
            hoverColor: 'rgba(0, 255, 255, 0.6)',
            dropdownColor: 'rgba(0, 255, 255, 0.2)',
            overscrollColor: '',
            scrollIndicatorColor: '',
            json: topsellers
        },
        {
            title: 'Featured',
            mainColor: 'rgba(255, 0, 255, 1)',
            hoverColor: 'rgba(255, 0, 255, 0.6)',
            dropdownColor: 'rgba(255, 0, 255, 0.2)',
            overscrollColor: '',
            scrollIndicatorColor: '',
            json: featured
        },
        {
            title: 'Recommended',
            mainColor: 'rgba(255, 255, 0, 1)',
            hoverColor: 'rgba(255, 255, 0, 0.6)',
            dropdownColor: 'rgba(255, 255, 0, 0.2)',
            overscrollColor: '',
            scrollIndicatorColor: '',
            json: recommended
        }
    ];

    return(
        <div id="main-container">
            <Helmet>
                <title>Home | CreativeTechnology</title>
            </Helmet>

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