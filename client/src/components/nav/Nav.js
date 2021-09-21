import React, { useEffect } from "react";
import { useHistory, NavLink } from "react-router-dom";
import "./Nav.css";
// constants
import { HOME_PATH, USER_PATH, TRANSACTIONS_PATH, CUSTOMERS_PATH, RECORDS_PATH } from "../../constants/routes";
import { LOGO_PNG } from "../../constants/images";
// material-ui
import { Button, IconButton, Avatar, Divider, } from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import StorageIcon from "@mui/icons-material/Storage";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const Nav = ({ username, balance }) => {
    const history = useHistory();

    useEffect(() => {
        window.addEventListener("scroll", scrollHandler)
        return () => {
            window.removeEventListener("scroll", scrollHandler)
        }
    }, []);

    const scrollHandler = () => {
        const nav = document.querySelector(".nav");
        if (window.scrollY > 5)
            nav.classList.add("nav__scrolled");
        else
            nav.classList.remove("nav__scrolled");
    };

    const navMenuHandler = () => {
        const navMenu = document.querySelector(".nav__menu");
        if (navMenu.style.display === "none" || !navMenu.style.display) {
            navMenu.style.display = "flex";
            navMenu.style.animation = "nav__menuAppear 0.2s ease-out 1 forwards";
        }
        else {
            navMenu.style.animation = "nav__menuDisappear 0.2s ease-out 1 forwards";
            setTimeout(() => navMenu.style.display = "none", 200);
        }
    };

    const handleSignOut = () => {
        localStorage.removeItem("sparks_bank");
        history.push(USER_PATH);
    };

    return (
        <nav className="nav">
            <IconButton className="nav__scrollToTopBtn" onClick={() => window.scrollTo(0, 0)}><ArrowUpwardIcon /></IconButton>
            <div className="nav__left">
                <img src={LOGO_PNG} alt="" onClick={() => history.push(HOME_PATH)} />
                <span>𝓢𝓹𝓪𝓻𝓴𝓼 𝓑𝓪𝓷𝓴</span>
            </div>
            <div className="nav__right">
                <NavLink exact to={HOME_PATH} className="nav__link" activeClassName="nav__linkActive">Home</NavLink>
                <NavLink exact to={TRANSACTIONS_PATH} className="nav__link" activeClassName="nav__linkActive">Transactions</NavLink>
                <NavLink exact to={CUSTOMERS_PATH} className="nav__link" activeClassName="nav__linkActive">Customers</NavLink>
                <NavLink exact to={RECORDS_PATH} className="nav__link" activeClassName="nav__linkActive">Records</NavLink>
                <Button onClick={() => handleSignOut()}>Sign Out</Button>
            </div>
            <IconButton className="nav__res" onClick={() => navMenuHandler()} ><MenuRoundedIcon /></IconButton>
            <div className="nav__menu" onClick={() => navMenuHandler()}>
                <div className="nav__menuItem" style={{ cursor: "default" }}>
                    <Avatar />{username} - {balance}
                </div>
                <Divider />
                <NavLink exact to={HOME_PATH} className="nav__menuItem" activeClassName="nav__menuItemActive">
                    <HomeRoundedIcon />Home
                </NavLink>
                <NavLink exact to={TRANSACTIONS_PATH} className="nav__menuItem" activeClassName="nav__menuItemActive">
                    <AttachMoneyRoundedIcon />Transactions
                </NavLink>
                <NavLink exact to={CUSTOMERS_PATH} className="nav__menuItem" activeClassName="nav__menuItemActive">
                    <GroupsRoundedIcon />Customers
                </NavLink>
                <NavLink exact to={RECORDS_PATH} className="nav__menuItem" activeClassName="nav__menuItemActive">
                    <StorageIcon />Records
                </NavLink>
                <div className="nav__menuItem" onClick={() => handleSignOut()}>
                    <LogoutRoundedIcon />Sign Out
                </div>
            </div>
        </nav>
    );
};

export default Nav;
