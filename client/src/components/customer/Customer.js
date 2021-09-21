import React from "react";
import "./Customer.css";

const Customer = ({ record, customer, animation, isHead, isRecord, handleClick, handleBlur }) => {
    return (
        <div className={`customer ${isHead ? "customer__head" : ""}`} style={{ animation }} onClick={() => handleClick ? handleClick(isRecord ? record : customer) : null} onBlur={() => handleBlur ? handleBlur() : null} tabIndex="0">
            <p style={{ fontWeight: isHead ? "700" : "400" }} className="customer__username"><span>{isRecord ? "From: " : "Username: "}</span>{isRecord ? record.from : customer.username}</p>
            <p style={{ fontWeight: isHead ? "700" : "400" }} className="customer__fullName"><span>{isRecord ? "To: " : "Full Name: "}</span>{isRecord ? record.to : customer.fullName}</p>
            <p style={{ fontWeight: isHead ? "700" : "400" }} className="customer__email"><span>{isRecord ? "Amount: " : "Email: "}</span>{isRecord ? record.amount : customer.email}</p>
            <p style={{ fontWeight: isHead ? "700" : "400" }} className="customer__balance"><span>{isRecord ? "Date: " : "Balance (₹): "}</span>{isRecord ? record.date : customer.balance}</p>
        </div>
    );
};

export default Customer;
