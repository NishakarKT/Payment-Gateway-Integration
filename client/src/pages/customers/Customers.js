import React, { useState, useEffect } from "react";
import "./Customers.css";
// components
import Customer from "../../components/customer/Customer";
import Footer from "../../components/footer/Footer";
import { TextField } from "@mui/material";
// values
const tableTitle = { username: "Username", fullName: "Full Name", email: "Email", balance: "Balance" };

const Customers = ({ customers }) => {
    const [search, setSearch] = useState("");

    const handleClick = customer => {
        alert(`Details:\nUsername: ${customer.username}\nFull Name: ${customer.fullName}\nEmail: ${customer.email}\nBalance: ${customer.balance}`);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="customers">
            <div className="customers__content">
                <TextField variant="standard" label="Search" onChange={e => setSearch(e.target.value)} />
                <Customer customer={tableTitle} isHead animation={`customer__appear 0.5s ease-out 1 forwards`} />
                <div className="customers__list">
                    {customers.filter(customer => (customer.fullName + customer.username + customer.email + customer.balance).toLowerCase().includes(search.toLowerCase())).reverse().map((customer, index) => <Customer key={index} customer={customer} animation={`customer__appear 0.5s ease-out ${(index + 1) * 0.1}s 1 forwards`} handleClick={handleClick} />)}
                </div>
                <div className="customers__shapeDivider">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                    </svg>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Customers;
