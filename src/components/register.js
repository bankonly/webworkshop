import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterComp() {
    const navigate = useNavigate();

    const [username, setUsername] = React.useState(null);
    const [email, setEmail] = React.useState(null);
    const [firstname, setFirstname] = React.useState(null);
    const [lastname, setLastname] = React.useState(null);
    const [password, setPassword] = React.useState(null);

    async function onRegister() {
        const formBody = {
            username: username,
            password: password,
            email: email,
            firstName: firstname,
            lastName: lastname,
        };

        try {
            const data = await axios.post("http://localhost:3001/user/register", formBody);
            if (data.status === 200) {
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div style={{ margin: "0 auto" }}>
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
                <TextField onChange={(event) => setEmail(event.target.value)} id="filled-basic" label="Email" variant="filled" />
            </Box>

            <Box
                component="form"
                sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField onChange={(event) => setFirstname(event.target.value)} id="filled-basic" label="First name" variant="filled" />
            </Box>

            <Box
                component="form"
                sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField onChange={(event) => setLastname(event.target.value)} id="filled-basic" label="Last name" variant="filled" />
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

            <Button onClick={onRegister} variant="contained">
                Register
            </Button>
        </div>
    );
}

export default RegisterComp;
