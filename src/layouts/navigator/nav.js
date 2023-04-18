import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Box, ClickAwayListener, Menu, MenuItem, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import authService from "../../service/auth.service";
import { logout } from "../../store/session";
import { getFirstName, getInfoUser, getLastName, getStatusLoading } from '../../store/user';
import { useEffect, useState } from 'react';
import NavTheme from '../../component/nav-section/NavTheme';
import navConfig from './config';
import { AnimatedIcon } from './styles';
import { Face } from '@mui/icons-material';

const NAV_WIDTH = 350;

const StyledAccount = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 2.5),
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
    backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));


export default function Nav() {
    const dispatch = useDispatch();
    const firstName = useSelector(getFirstName());
    const lastName = useSelector(getLastName());
    const isLoadingUserInfo = useSelector(getStatusLoading());


    useEffect(() => {
        dispatch(getInfoUser())
    }, [dispatch])

    async function handleLogout() {
        try {
            await authService.logout();
            dispatch(logout());

        } catch (error) {
            console.log(error);
            dispatch(logout());
        }
    }

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event) => {
        setAnchorEl(null);
    };

    const renderContent = (
        <Box>
            <Box sx={{ mb: 5, mx: 5 }}>
                <StyledAccount>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ ml: 2, maxWidth: 150 }}>
                            <Typography variant="subtitle2" sx={{ color: 'text.primary', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {firstName}
                            </Typography>
                            <Typography variant="subtitle2" sx={{ color: 'text.primary', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {lastName}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Пользователь
                            </Typography>
                        </Box>
                        <AnimatedIcon
                            sx={{ ml: 5 }}
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            id="basic-button"
                            onClick={handleClick}
                        >
                            <Face />
                        </AnimatedIcon>
                        <ClickAwayListener mouseEvent="onMouseDown" touchEvent="onTouchStart" onClickAway={handleClose}>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={handleLogout}>Выйти</MenuItem>
                            </Menu>
                        </ClickAwayListener>
                    </Box>
                </StyledAccount>
            </Box>
            <Typography variant="h6" fontWeight="bold" sx={{ color: 'text.primary', textAlign: 'center' }}>
                Темы для изучения:
            </Typography>
            <NavTheme data={navConfig} />
        </Box>
    );

    return (
        <Box
            component="nav"
            sx={{
                flexShrink: { lg: 0 },
                width: { lg: NAV_WIDTH },
            }}
        >
            {isLoadingUserInfo ? null : renderContent}
        </Box>
    )
};