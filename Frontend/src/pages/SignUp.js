import React from "react";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Header from '../components/Header';

export default function SignUp() {
    return (
        <div style={{ height: "100%" }}>
            <Header />
            <div>Sign Up</div>
            <br />
            <br />
            <div className="w-25 items-center justify-between mx-auto" style={{ height: "100%" }}>
                <form>
                    <TextField
                        type="text"
                        name="username"
                        label="username"
                    />
                    <br />
                    <br />
                    <TextField
                        type="text"
                        name="email"
                        label="email"
                    />
                    <br />
                    <br />
                    <TextField
                        type="password"
                        name="password"
                        label="password"
                    />
                    <br />
                    <br />
                    <TextField
                        type="password"
                        name="pwconfirm"
                        label="confirm password"
                    />
                    <br />
                    <br />
                    <Button
                        primary={true}
                        type="submit"
                        label="submit"
                        variant="contained"
                    >Submit</Button>
                </form>
                <br />
                <p>
                    Aleady have an account?
                    <br />
                    <a href="/signin">Sign in here</a>
                </p>
            </div>
        </div>
    );
};