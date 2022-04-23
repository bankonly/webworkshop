import * as React from "react";
import axios from "axios";
import "../css/profile.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const navigate = useNavigate();
    const { useEffect, useState } = React;

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // boolean

    async function getProfile() {
        try {
            setIsLoading(true);
            const token = localStorage.getItem("token");
            if(!token){
                navigate("/login")
                return;
            }
            const data = await axios.get("http://localhost:3001/user/profile", {
                headers: {
                    authorization: token,
                },
            });
            setUser(data.data);
            setIsLoading(false);
            console.log(data.data);
        } catch (error) {
            console.log(error.message);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getProfile();
    }, []);

    function onLogout() {
        localStorage.clear();
        navigate("/login");
    }

    return (
        <div className="profile-container">
            {isLoading === true ? (
                <h1>Loading user data</h1>
            ) : (
                <div className="profile-cover">
                    <h3>Infomation</h3>
                    <div className="form-display">Email Address: {user.email} </div>
                    <div className="form-display">Username: {user.username} </div>
                    <div className="form-display">First Name: {user.firstName} </div>
                    <div className="form-display">Last Name: {user.lastName} </div>

                    <Button onClick={onLogout}>Logout</Button>
                </div>
            )}
        </div>
    );
}
