import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../Copyright';
import { login, getProcessAuthStatus, getErrorText, resetTextError } from '../../store/session';
import { NavLink } from "react-router-dom";
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import { resetSuccessfull } from '../../store/register';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import utilsString from '../../utils/utilsString';
import AlertClose from '../Alert/AlertClose';
import TextFieldWithError from '../TextField/TextFieldWithError';

const theme = createTheme();

export function SignIn() {
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const authInProcess = useSelector(getProcessAuthStatus());
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation();
    const errorText = useSelector(getErrorText());

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const data = new FormData(event.currentTarget);
        const username = data.get('username');
        const password = data.get('password');
        const valid =
            !utilsString.isEmptyString(username) &&
            !utilsString.isEmptyString(password);

        if (valid) {
            dispatch(login({
                payload:
                {
                    username,
                    password,
                }
            }))
        } else {
            dispatch(resetTextError())
        }
        
        setTimeout(() => {
            setIsLoading(false);
        }, 100)
    };

    useEffect(() => {
        dispatch(resetSuccessfull());
    }, [dispatch])

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (e) => e.preventDefault();

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {t('to_come_in_title')}
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        {errorText && !isLoading ?
                            <AlertClose text={errorText} /> : null}
                        <TextFieldWithError
                            id="username"
                            label={t('login')}
                            name="username"
                            disabled={authInProcess}
                            sendField={isLoading}
                            autoFocus={true}
                        >
                        </TextFieldWithError>
                        <TextFieldWithError
                            id="password"
                            label={t('password')}
                            name="password"
                            disabled={authInProcess}
                            sendField={isLoading}
                            autoFocus={false}
                            type={showPassword ? 'text' : 'password'}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            disabled={authInProcess}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        >
                        </TextFieldWithError>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={authInProcess}
                        >
                            {t('to_come_in')}
                        </Button>
                        <Grid container justifyContent="center">
                            <Grid item>
                                <NavLink to="/register" variant="body2">
                                    {t('register')}
                                </NavLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}