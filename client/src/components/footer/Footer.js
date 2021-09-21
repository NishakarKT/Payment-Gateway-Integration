import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
// constants
import { HOME_PATH, TRANSACTIONS_PATH, CUSTOMERS_PATH, CONTACT_FB_PATH, CONTACT_LI_PATH, CONTACT_IG_PATH, RECORDS_PATH } from "../../constants/routes";
// material-ui
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer__left">
                <h1>About</h1>
                <p>Hey there! I hope you liked Sparks Bank :) I, Nishakar Kumar, a second year undergraduate at IIT Kharagpur, have created this website as an internship task under <b>The Sparks Foundation</b>. I have used <b>React</b> for front-end and <b>node</b> for back-end and created the <b>Sparks Bank</b>.</p>
            </div>
            <div className="footer__right">
                <div className="footer__links">
                    <h1>Links</h1>
                    <Link className="footer__link" to={HOME_PATH}>Home</Link>
                    <Link className="footer__link" to={TRANSACTIONS_PATH}>Transactions</Link>
                    <Link className="footer__link" to={CUSTOMERS_PATH}>Customers</Link>
                    <Link className="footer__link" to={RECORDS_PATH}>Records</Link>
                </div>
                <div className="footer__links">
                    <h1>Contact</h1>
                    <div className="footer__icons">
                        <FacebookIcon style={{ color: "#4867aa" }} onClick={() => window.open(CONTACT_FB_PATH, "_blank")} />
                        <InstagramIcon style={{ color: "#f66b3f" }} onClick={() => window.open(CONTACT_IG_PATH, "_blank")} />
                        <LinkedInIcon style={{ color: "#0077b5" }} onClick={() => window.open(CONTACT_LI_PATH, "_blank")} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
