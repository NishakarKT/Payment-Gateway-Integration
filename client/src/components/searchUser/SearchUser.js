import React, { useState } from "react";
import "./SearchUser.css";
// components
import Customer from "../../components/customer/Customer";
// material-ui
import { TextField } from "@mui/material";

const SearchUser = ({ customers, setCustomer }) => {
    const [search, setSearch] = useState("");

    const handleChoice = customer => setCustomer(customer);
    const handleBlur = () => setCustomer({});

    return (
        <div className="searchUser">
            <TextField variant="standard" label="Search User" onChange={e => setSearch(e.target.value)} />
            <div className="searchUser__customers">
                {customers.filter(customer => (customer.fullName + customer.username + customer.email + customer.balance).toLowerCase().includes(search.toLowerCase())).map((customer, index) => <Customer key={index} customer={customer} animation={`customer__appear 0.5s ease-out ${(index + 1) * 0.2}s 1 forwards`} handleClick={handleChoice} handleBlur={handleBlur} />)}
            </div>
        </div>
    );
};

export default SearchUser;
