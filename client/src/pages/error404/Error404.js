import React from "react";
import { useHistory } from "react-router-dom";
import "./Error404.css";
// constants
import { ERROR404_PNG } from "../../constants/images";
import { HOME_PATH } from "../../constants/routes";
// material-ui
import Button from "@mui/material/Button";
import DoorBackRoundedIcon from "@mui/icons-material/DoorBackRounded";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

const Error404 = () => {
    const history = useHistory();

    return (
        <div className="error404">
            <img className="error404__illustration" src={ERROR404_PNG} alt="" />
            <div className="error404__content">
                <h1>Error 404 - Page Not Found!</h1>
                <h2>Well... Looks like the page your are trying to excess is either removed or does not exist.</h2>
                <h3>Lost? Try going back. Still lost? Try finding your way back fromm the home page.</h3>
                <div className="error404__buttons">
                    <Button onClick={() => history.goBack()}><DoorBackRoundedIcon />Back</Button>
                    <Button onClick={() => history.push(HOME_PATH)}><HomeRoundedIcon />Home</Button>
                </div>
            </div>
        </div>
    );
};

export default Error404;
