import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import CustomAppBar from "./components/appbar";
import RegisterComp from "./components/register";
import LoginComp from "./components/login";
import Profile from "./components/profile";
ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <CustomAppBar />
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/register" element={<RegisterComp />} />
                <Route path="/login" element={<LoginComp />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
