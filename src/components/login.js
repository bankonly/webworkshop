import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginComp() {
    const navigate = useNavigate();
    const { useState } = React;
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const onLogin = async () => {
        try {
            const formData = {
                username: username,
                password: password,
            };
            const data = await axios.post("http://localhost:3001/user/login", formData);
            console.log(data.status);
            if (data.status === 200) {
                localStorage.setItem("token", data.data);
                navigate("/profile");
            }
        } catch (error) {
            console.log(error.response);
        }
    };

    return (
        <div>
            <Box
                component="form"
                sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField onChange={(event) => setUsername(event.target.value)} id="filled-basic" label="Username" variant="filled" />
            </Box>
            <Box
                component="form"
                sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField onChange={(event) => setPassword(event.target.value)} id="filled-basic" label="Password" variant="filled" />
            </Box>
            <Button onClick={onLogin} variant="contained">
                Login
            </Button>
        </div>
    );
}
