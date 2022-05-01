import * as React from "react";
import axios from "axios";
import "../css/profile.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setProfile } from "../reducers/user";

export default function Profile() {
    const userState = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const { useEffect, useState } = React;

    const [isLoading, setIsLoading] = useState(true); // boolean

    async function getProfile() {
        try {
            setIsLoading(true);
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }
            const data = await axios.get("http://134.209.103.131:3001/user/profile", {
                headers: {
                    authorization: token,
                },
            });
            dispatch(setProfile(data.data));
            setIsLoading(false);
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
                    <div className="form-display">Email Address: {userState.user.email} </div>
                    <div className="form-display">Username: {userState.user.username} </div>
                    <div className="form-display">First Name: {userState.user.firstName} </div>
                    <div className="form-display">Last Name: {userState.user.lastName} </div>

                    <Button onClick={onLogout}>Logout</Button>
                </div>
            )}
        </div>
    );
}
