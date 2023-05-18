import React from "react";
import { styled } from '@mui/material/styles';
import Nav from "../layouts/navigator/nav";
import { Box } from '@mui/material';
import AppLoader from "../component/Apploader";
import { Route, Routes } from "react-router";
import NotFound from "./NotFound";
import { UserStatistics } from "../component/UserStatistics";
import { Lesson } from "../component/Lesson";
import { useSelector } from "react-redux";
import { getUserIsAdmin } from "../store/user";
import AdministratorPanel from "../component/Administrator/AdministratorPanel";


const StyledRoot = styled('div')({
    display: 'flex',
    minHeight: '100%',
    overflow: 'hidden',
});

const StyledContent = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
    marginLeft: 400,
}));

const StyledNav = styled(Box)(({ theme }) => ({
    position: 'fixed',
    width: '350px',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflowY: 'scroll',
    padding: theme.spacing(2),
}));

export default function Main() {
    const userIsAdmin = useSelector(getUserIsAdmin())

    return (
        <AppLoader>
            <StyledRoot>
                <Box sx={{ flexShrink: 0 }}>
                    <StyledNav>
                        <Nav />
                    </StyledNav>
                </Box>
                <StyledContent>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <Lesson />
                            }
                        />
                        <Route
                            path="/statistics"
                            element={
                                <UserStatistics />
                            }
                        />
                        <Route
                            path="/administrator"
                            element={
                                userIsAdmin ?
                                    <AdministratorPanel /> :
                                    <NotFound />
                            }
                        />
                        <Route
                            path="/*"
                            element={
                                <NotFound />
                            }
                        />
                    </Routes>
                </StyledContent>
            </StyledRoot>
        </AppLoader>
    );
};