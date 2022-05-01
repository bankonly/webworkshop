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
import store from "./store";
import { Provider } from "react-redux";
import MyPostComponent from "./components/myPost";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <CustomAppBar />
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/register" element={<RegisterComp />} />
                    <Route path="/login" element={<LoginComp />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/myPost" element={<MyPostComponent />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
