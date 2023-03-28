import "./splash-page-css/SplashHeader.css";
const { Link } = require("react-router-dom");
const signalLogo = require("../../images/signalLogo.png");


function SplashHeader() {

    return (
        <div id="splash-header">
            <Link id="splash-header-left" to="/">
                <div className="image-container" id="splash-header-logo">
                    <img src={signalLogo} alt="Receptions Logo" />
                </div>
                <p>Receptions</p>
            </Link>

            <ul id="splash-header-right">
                <Link className="splash-header-list-item" to="/signup">
                    Join Receptions
                </Link>

                <a className="splash-header-list-item" href="https://www.github.com/epsldn/receptions">
                    Github
                </a>

                <a className="splash-header-list-item" href="https://linkedin.com/in/epsldn">
                    Developer
                </a>
            </ul>
        </div>
    );
}

export default SplashHeader;