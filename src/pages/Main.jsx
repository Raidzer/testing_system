import React, { useEffect, } from "react";
import httpService from "../service/http.service";
import Button from '@mui/material/Button';
import authService from "../service/auth.service";
import { useDispatch } from "react-redux";
import { logout } from "../store/users";

export default function Main() {
    const dispatch = useDispatch();

    async function handleLogout() {
        try {
            await authService.logout();
            dispatch(logout());

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            Привет
            <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => handleLogout()}
            >
                Выйти
            </Button>
        </div>
    )
}