import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import validator from "validator";
import "./User.css";
// constants
import { LOGO_PNG, SIGN_IN_PNG, SIGN_UP_PNG } from "../../constants/images";
import { HOME_PATH, CONTACT_FB_PATH, CONTACT_IG_PATH, CONTACT_LI_PATH, AUTH_ENDPOINT, NEW_ENDPOINT, TOKEN_ENDPOINT } from "../../constants/routes";
// components
import SecureInput from "../../components/secureInput/SecureInput";
import Loading from "../../components/loading/Loading";
// material-ui
import { TextField, Button, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

const User = () => {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [mode, setMode] = useState("signIn");
    const [auth, setAuth] = useState(false);
    // signin
    const [myUsername, setMyUsername] = useState("");
    const [myPassword, setMyPassword] = useState("");
    const [myUsernameError, setMyUsernameError] = useState(false);
    const [myPasswordError, setMyPasswordError] = useState(false);
    // sign up
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [balance, setBalance] = useState(0);
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [signInError, setSignInError] = useState("");
    const [signUpError, setSignUpError] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    const [fullNameError, setFullNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmedPasswordError, setConfirmedPasswordError] = useState(false);
    const [balanceError, setBalanceError] = useState(false);

    useEffect(() => {
        try {
            const { token } = JSON.parse(localStorage.getItem("sparks_bank"));
            axios.post(TOKEN_ENDPOINT, { token }).then(res => {
                if (res.data.username)
                    history.push(HOME_PATH);
                else
                    setAuth(true);
            }).catch(err => { console.log(err); });
        } catch (err) { setAuth(true); }
    }, [history]);

    const handleMode = () => {
        const illustrations = Array.from(document.getElementsByClassName("user__illustration"));

        setMode(mode => {
            if (mode === "signIn") {
                illustrations[0].style.animation = "user__illustrationDisappear 1s linear 1 forwards";
                illustrations[1].style.animation = "user__illustrationAppear 1s linear 1 forwards";
            }
            else {
                illustrations[0].style.animation = "user__illustrationAppear 1s linear 1 forwards";
                illustrations[1].style.animation = "user__illustrationDisappear 1s linear 1 forwards";
            }
            return mode === "signIn" ? "signUp" : "signIn";
        });
    };

    const handleSignIn = e => {
        setIsLoading(true);
        e.preventDefault();

        setMyUsernameError(!Boolean(myUsername));
        setMyPasswordError(!Boolean(myPassword));

        if (myUsername && myPassword) {
            const userCreds = { myUsername, myPassword };

            axios.post(AUTH_ENDPOINT, userCreds).then(res => {
                if (res.data.auth) {
                    localStorage.setItem("sparks_bank", JSON.stringify({ token: res.data.token }));
                    history.push(HOME_PATH);
                }
                else if (res.data.err)
                    setSignInError(res.data.err);
                else
                    setSignInError(res.data)
                setIsLoading(false);
            }).catch(() => { setIsLoading(false); });

            // reset
            setMyPassword("");
            e.target.reset();
        }
    };

    const handleGetStarted = () => {
        const signInBtn = document.querySelector(".user__" + mode).querySelector(".MuiButton-root");
        signInBtn.click();
    };

    const handleSignUp = e => {
        setIsLoading(true);
        e.preventDefault();

        setUsernameError(!Boolean(username));
        setFullNameError(!Boolean(fullName));
        setEmailError(!Boolean(email));
        setPasswordError(!Boolean(password));
        setConfirmedPasswordError(!Boolean(confirmedPassword));
        setBalanceError(!Boolean(balance));

        if (!validator.isEmail(email)) {
            setSignUpError("Email is not a valid one! Enter a proper Email.");
            setEmail("");
        }
        else if (password !== confirmedPassword) {
            setSignUpError("Password didn't match with confirmed password!");
            setPassword("");
            setConfirmedPassword("");
        }
        else if (username && fullName && validator.isEmail(email) && password && confirmedPassword && balance) {
            const userData = { username, fullName, email, password, balance };

            axios.post(NEW_ENDPOINT, userData).then(res => {
                localStorage.setItem("sparks_bank", JSON.stringify({ token: res.data }));
                e.target.reset();
                setIsLoading(false);
                history.push(HOME_PATH);
            }).catch(err => {
                setSignUpError("Account could not be created! Sorry for inconvinience.");
                setIsLoading(false);
            });

            // reset
            setPassword("");
            setConfirmedPassword("");
        }
    };

    return (auth ?
        <div className="user">
            {isLoading ? <Loading /> : null}
            <div className={"user__bgShape user__bgShape_" + mode}></div>

            <div className={"user__modeBtn user__modeBtn_" + mode} tabIndex="0">
                <Button onClick={() => handleMode()}>{mode === "signIn" ? "Sign Up" : "Sign In"}</Button>
            </div>

            <div className={"user__intro user__intro_" + mode}>
                <div className="user__title" >
                    <img src={LOGO_PNG} alt="" onClick={() => history.push(HOME_PATH)} />
                    <span>𝓢𝓹𝓪𝓻𝓴𝓼 𝓑𝓪𝓷𝓴</span>
                </div>
                <div className="user__content">
                    <p><b>Sparks Bank</b> is created by Nishakar Kumar as an Internship task for <b>The Sparks Foundation</b>.The website allows users to create a bank account, transact money online and many more. Hope you like it :)</p>
                    <Button onClick={() => handleGetStarted()}>Get Started</Button>
                </div>
            </div>

            <img className="user__illustration" src={SIGN_IN_PNG} alt="" style={{ bottom: "-10px", left: "-10px", animation: "user__illustrationAppear 1s linear 1 forwards" }} />
            <img className="user__illustration" src={SIGN_UP_PNG} alt="" style={{ bottom: "10px", right: "10px" }} />

            <div className="user__inputs">
                {mode === "signUp" ?
                    <form className="user__signUp" onSubmit={e => handleSignUp(e)}>
                        <TextField variant="standard" label="Username" error={usernameError} helperText={usernameError ? "What's your username?" : ""} value={username} onChange={e => setUsername(e.target.value)} style={{ animation: "signUp__inputsAppear 1s linear 0.5s 1 forwards" }} />
                        <TextField variant="standard" label="Full Name" error={fullNameError} helperText={fullNameError ? "What's your full name?" : ""} value={fullName} onChange={e => setFullName(e.target.value)} style={{ animation: "signUp__inputsAppear 0.5s linear 1.2s 1 forwards" }} />
                        <TextField variant="standard" label="Email" error={emailError} helperText={emailError ? "What's your email?" : ""} value={email} onChange={e => setEmail(e.target.value)} style={{ animation: "signUp__inputsAppear 0.5s linear 1.4s 1 forwards" }} />
                        <SecureInput label={"Password"} input={password} setInput={setPassword} error={passwordError} helperText={"What's your password?"} style={{ animation: "signUp__inputsAppear 0.5s linear 1.6s 1 forwards" }} />
                        <SecureInput label={"Confirm Password"} input={confirmedPassword} setInput={setConfirmedPassword} error={confirmedPasswordError} helperText={"What's your confirmed password?"} style={{ animation: "signUp__inputsAppear 0.5s linear 1.8s 1 forwards" }} />
                        <TextField variant="standard" label="Balance" type="number" error={balanceError} helperText={balanceError ? "What's your balance?" : ""} value={balance} onChange={e => setBalance(e.target.value)} style={{ animation: "signUp__inputsAppear 0.5s linear 2s 1 forwards" }} />
                        <Button type="submit" style={{ animation: "signUp__inputsAppear 0.5s linear 2.2s 1 forwards" }}>Sign Up</Button>
                        {signUpError ? <p className="user__errorMsg">{signUpError}</p> : null}
                        <div className="user__contact" style={{ animation: "signUp__inputsAppear 0.5s linear 2.2s 1 forwards" }}>
                            <IconButton style={{ color: "#4867aa" }} onClick={() => window.open(CONTACT_FB_PATH, "_blank")}><FacebookIcon /></IconButton>
                            <IconButton style={{ color: "#f66b3f" }} onClick={() => window.open(CONTACT_IG_PATH, "_blank")}><InstagramIcon /></IconButton>
                            <IconButton style={{ color: "#0077b5" }} onClick={() => window.open(CONTACT_LI_PATH, "_blank")}><LinkedInIcon /></IconButton>
                        </div>
                    </form> :
                    <form className="user__signIn" onSubmit={e => handleSignIn(e)}>
                        <TextField variant="standard" label="Username" error={myUsernameError} helperText={myUsernameError ? "What's your username?" : ""} value={myUsername} onChange={e => setMyUsername(e.target.value)} style={{ animation: "signIn__inputsAppear 0.5s linear 1s 1 forwards" }} />
                        <SecureInput label={"Password"} input={myPassword} setInput={setMyPassword} error={myPasswordError} helperText={"What's your password?"} style={{ animation: "signUp__inputsAppear 0.5s linear 1.2s 1 forwards" }} />
                        <Button type="submit" style={{ animation: "signIn__inputsAppear 0.5s linear 1.4s 1 forwards" }}>Sign In</Button>
                        {signInError ? <p className="user__errorMsg">{signInError}</p> : null}
                        <div className="user__contact" style={{ animation: "signUp__inputsAppear 0.5s linear 1.6s 1 forwards" }}>
                            <IconButton style={{ color: "#4867aa" }} onClick={() => window.open(CONTACT_FB_PATH, "_blank")}><FacebookIcon /></IconButton>
                            <IconButton style={{ color: "#f66b3f" }} onClick={() => window.open(CONTACT_IG_PATH, "_blank")}><InstagramIcon /></IconButton>
                            <IconButton style={{ color: "#0077b5" }} onClick={() => window.open(CONTACT_LI_PATH, "_blank")}><LinkedInIcon /></IconButton>
                        </div>
                    </form>}
            </div>
        </div> : <Loading />
    );
};

export default User;
