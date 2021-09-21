import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import "./Transactions.css";
// constants
import { HOME_PATH, TRANSACTIONS_ENDPOINT, SET_TRANSACTIONS_ENDPOINT } from "../../constants/routes";
// components
import SearchUser from "../../components/searchUser/SearchUser";
import Transaction from "../../components/transaction/Transaction";
import Footer from "../../components/footer/Footer";
// material-ui
import { styled } from '@mui/material/styles';
import { Button, Stepper, Step, StepLabel } from "@mui/material";
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';

const Transactions = ({ user, customers }) => {
    const [mode, setMode] = useState(0);
    const [customer, setCustomer] = useState({});
    const [transaction, setTransaction] = useState({ amount: 0, mode: "" });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
        [`&.${stepConnectorClasses.alternativeLabel}`]: { top: 22, },
        [`&.${stepConnectorClasses.active}`]: { [`& .${stepConnectorClasses.line}`]: { backgroundImage: 'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)', }, },
        [`&.${stepConnectorClasses.completed}`]: { [`& .${stepConnectorClasses.line}`]: { backgroundImage: 'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)', }, },
        [`& .${stepConnectorClasses.line}`]: { height: 3, border: 0, backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0', borderRadius: 1, },
    }));

    const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc', zIndex: 1, color: '#fff', width: 50, height: 50, display: 'flex', borderRadius: '50%', justifyContent: 'center', alignItems: 'center', ...(ownerState.active && { backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)', boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)', }), ...(ownerState.completed && { backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)', }),
    }));

    function ColorlibStepIcon(props) {
        const { active, completed, className } = props;
        const icons = { 1: <PersonRoundedIcon />, 2: <AttachMoneyRoundedIcon />, 3: <DoneRoundedIcon />, };
        return (
            <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
                {icons[String(props.icon)]}
            </ColorlibStepIconRoot>
        );
    }

    ColorlibStepIcon.propTypes = {
        /**
         * Whether this step is active.
         * @default false
         */
        active: PropTypes.bool,
        className: PropTypes.string,
        /**
         * Mark the step as completed. Is passed to child components.
         * @default false
         */
        completed: PropTypes.bool,
        /**
         * The label displayed in the step icon.
         */
        icon: PropTypes.node,
    };

    const stepUp = () => {
        if (mode === 0) {
            if (Object.keys(customer).length <= 0) {
                alert("Please, select a user you wish to transact.")
                return;
            }
        }
        else if (mode === 1 && transaction.amount && transaction.mode) {
            const myBalance = transaction.mode === "withdraw" ? user.balance + transaction.amount : user.balance - transaction.amount;
            const userBalance = transaction.mode === "withdraw" ? customer.balance - transaction.amount : customer.balance + transaction.amount;

            if (myBalance < 0 || userBalance < 0) {
                alert("Transaction not possible due to insufficient balance.");
                return;
            }
            else {
                const areYouSure = window.confirm("Are your sure, you wish to commit the following transaction?");
                if (areYouSure) {
                    const data = {
                        myUsername: user.username,
                        username: customer.username,
                        myBalance,
                        userBalance
                    }
                    const transactionData = {
                        from: user.username,
                        to: customer.username,
                        amount: transaction.mode === "withdraw" ? -transaction.amount : transaction.amount,
                        date: new Date(Date.now()).toLocaleDateString()
                    }

                    axios.post(SET_TRANSACTIONS_ENDPOINT, transactionData).then(res => { }).catch(() => { });

                    axios.patch(TRANSACTIONS_ENDPOINT, data).then(res => { }).catch(() => { });

                    setTimeout(() => window.location.replace(HOME_PATH), 1000);
                }
                else
                    return;
            }
        }
        else if (mode === 1) {
            alert("Please, set a valid transaction.");
            return
        }
        setMode(mode => mode < 2 ? ++mode : mode);
    };

    const stepDown = () => {
        if (mode === 1) {
            setCustomer({});
        }
        setMode(mode => mode > 0 ? --mode : mode);
    };

    const steps = ['Find User ', 'Set Transaction', 'Transaction: Successfull!'];

    return (
        <div className="transactions">
            <div className="transactions__content">
                <Stepper alternativeLabel activeStep={mode} connector={<ColorlibConnector />}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel StepIconComponent={ColorlibStepIcon}><span style={{ fontSize: "15px", color: "#335271" }}>{label}</span></StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <div className="transactions__steppers">
                    <Button onMouseDown={() => stepDown()}>Back</Button>
                    <Button onMouseDown={() => stepUp()}>Next</Button>
                </div>
                {mode === 0 ? <SearchUser customers={customers} setCustomer={setCustomer} /> : null}
                {mode === 1 ? <Transaction transaction={transaction} setTransaction={setTransaction} /> : null}
                <div className="transactions__shapeDivider">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                    </svg>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Transactions;
