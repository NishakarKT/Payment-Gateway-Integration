import React from "react";
import "./Transaction.css";
// material-ui
import { TextField, Button } from "@mui/material";

const Transaction = ({ transaction, setTransaction }) => {

    const handleBlur = () => setTransaction(transaction => ({ ...transaction, mode: "" }));

    return (
        <div className="transaction">
            <TextField variant="standard" label="Amount In Rupees (₹)" type="number" value={transaction.amount} onChange={e => setTransaction(transaction => ({ ...transaction, amount: e.target.value ? Number(e.target.value) : "" }))} />
            <div className="transaction__buttons">
                <Button onMouseDown={() => setTransaction(transaction => ({ ...transaction, mode: "withdraw" }))} onBlur={() => handleBlur()}>Withdraw</Button>
                <Button onMouseDown={() => setTransaction(transaction => ({ ...transaction, mode: "deposit" }))} onBlur={() => handleBlur()}>Deposit</Button>
            </div>
        </div>
    );
};
export default Transaction;
