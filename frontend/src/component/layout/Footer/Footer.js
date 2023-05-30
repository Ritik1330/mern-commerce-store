import React from "react";
import playstore from "../../../images/playstore.png";
import Appstore from "../../../images/Appstore.png";
import './Footer.css'
function Footer() {
    return (
        <footer id="footer">
            <div className="leftFooter">
                <h1> DAWNLOAD OUR APP </h1>
                <p>dawnlod app for android and ios</p>
                <img src={playstore} alt="playstore" />
                <img src={Appstore} alt="Appstore" />
            </div>
            <div className="midFooter">

                <h1> ECOMMERCE</h1>
                <p>high quality is our first priority</p>
                <p>Coppyright 2023 &copy; meRitik</p>
            </div>
            <div className="rightFooter">
            <h1> Follow Us </h1>
            <a href="https://redux-toolkit.js.org/api/createSlice">youtube</a>
            <a href="https://redux-toolkit.js.org/api/createSlice">facebook</a>
            <a href="https://redux-toolkit.js.org/api/createSlice">instagram</a>
            </div>
        </footer>
    );
}

export default Footer;
