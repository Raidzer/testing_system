import * as React from 'react';
import { useState } from 'react';
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
import { NavLink, useNavigate } from 'react-router-dom';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import { register, getStatusRegistration, getErrorText, resetTextError } from '../../store/register';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import TextFieldWithError from '../TextField/TextFieldWithError';
import utilsString from '../../utils/utilsString';
import AlertClose from '../Alert/AlertClose';

const theme = createTheme();

export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const registerIsSuccessful = useSelector(getStatusRegistration())
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation();
    const errorText = useSelector(getErrorText());

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        const data = new FormData(event.currentTarget);
        const firstName = data.get('firstName');
        const lastName = data.get('lastName')
        const username = data.get('username');
        const password = data.get('password');
        const valid =
            !utilsString.isEmptyString(firstName) &&
            !utilsString.isEmptyString(lastName) &&
            !utilsString.isEmptyString(username) &&
            !utilsString.isEmptyString(password);

        if (valid) {
            dispatch(register({
                payload: {
                    firstName,
                    lastName,
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
        if (registerIsSuccessful) {
            navigate('/login');
        }
    }, [registerIsSuccessful, navigate]);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

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
                        {t('register_in_system')}
                    </Typography>
                    {errorText && !isLoading ?
                        <AlertClose text={errorText} /> : null}
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextFieldWithError
                                    id="firstName"
                                    label={t('first_name')}
                                    name="firstName"
                                    sendField={isLoading}
                                    autoFocus={true}
                                    autoComplete="given-name"
                                >
                                </TextFieldWithError>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextFieldWithError
                                    id="lastName"
                                    label={t('last_name')}
                                    name="lastName"
                                    sendField={isLoading}
                                    autoFocus={true}
                                    autoComplete="family-name"
                                >
                                </TextFieldWithError>
                            </Grid>
                            <Grid item xs={12}>
                                <TextFieldWithError
                                    id="username"
                                    label={t('login')}
                                    name="username"
                                    sendField={isLoading}
                                    autoFocus={true}
                                    autoComplete="login"
                                >
                                </TextFieldWithError>
                            </Grid>
                            <Grid item xs={12}>
                                <TextFieldWithError
                                    id="password"
                                    label={t('password')}
                                    name="password"
                                    sendField={isLoading}
                                    autoFocus={true}
                                    autoComplete="new-password"
                                    type={showPassword ? 'text' : 'password'}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                >
                                </TextFieldWithError>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {t('register')}
                        </Button>
                        <Grid container justifyContent="center">
                            <Grid item>
                                <NavLink to="/login" variant="body2">
                                    {t('have_account')}
                                </NavLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}