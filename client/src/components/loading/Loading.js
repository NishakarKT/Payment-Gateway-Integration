import React from "react";
import "./Loading.css";
// components
import Loader from "../loader/Loader";

const Loading = () => {
    return (
        <div className="loading">
            <Loader />
        </div>
    );
};

export default Loading;
