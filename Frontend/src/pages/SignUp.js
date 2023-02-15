import React from "react";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Header from '../components/Header';

export default function SignUp() {
    return (
        <div style={{ height: "100%" }}>
            <Header />
            <div>Sign Up</div>
            <div className="w-25 items-center justify-between mx-auto">

                <form>
                    <TextField
                        type="text"
                        name="username"
                        floatingLabelText="user name"
                    />
                    <TextField
                        type="text"
                        name="email"
                        floatingLabelText="email"
                    />
                    <TextField
                        type="password"
                        name="password"
                        floatingLabelText="password"
                    />
                    <TextField
                        type="password"
                        name="pwconfirm"
                        floatingLabelText="confirm password"
                    />
                    <br />
                    <Button
                        className="w-50"
                        primary={true}
                        type="submit"
                        label="submit"
                    />
                </form>
                <p>
                    Aleady have an account? <br />
                    <a href="/">Log in here</a>
                </p>
            </div>
        </div>
    );
};