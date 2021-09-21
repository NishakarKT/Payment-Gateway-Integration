import React, { useState } from "react";
import "./SecureInput.css";
// material-ui
import { TextField, IconButton, InputAdornment } from "@mui/material";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";

const SecureInput = ({ label, style, input, error, helperText, setInput }) => {
    const [type, setType] = useState("password");
    const [visibility, setVisibility] = useState(false);

    const handleVisibility = e => {
        setType(type => type === "password" ? "text" : "password");
        setVisibility(visibility => !visibility);
    };

    return (
        <TextField variant="standard" type={type} label={label} error={error} helperText={error ? helperText : ""} value={input} onChange={e => setInput(e.target.value)} style={style} InputProps={{ endAdornment: (<InputAdornment position="start"><IconButton onClick={e => handleVisibility(e)}>{visibility ? <VisibilityRoundedIcon /> : <VisibilityOffRoundedIcon />}</IconButton></InputAdornment>) }} />
    );
};

export default SecureInput;
