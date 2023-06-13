import React from "react";
import { styled } from '@mui/material/styles';
import Nav from "../layouts/navigator/nav";
import { Box } from '@mui/material';
import AppLoader from "../component/Apploader";
import { Route, Routes } from "react-router";
import NotFound from "./NotFound";
import { useSelector } from "react-redux";
import { getUserIsAdmin } from "../store/user";
import AdministratorPanelTheme from "../component/Administrator/AdministratorPanelTheme";
import AdministratorPanelArticle from "../component/Administrator/AdministratorPanelArticle";
import AdministratorPanelQuestion from "../component/Administrator/AdministratorPanelQuestion";
import TextEditor from "../component/TextEditor/TextEditor";
import ArticleEditor from "../component/Administrator/Editors/ArticleEditor";
import Lesson from "../component/Lesson/Lesson";
import UserStatistics from "../component/UserStatistics";
import Welcome from "../component/Welcome";


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
    const userIsAdmin = useSelector(getUserIsAdmin());

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
                                <Welcome />
                            }
                        />
                        <Route
                            path="/:idTheme"
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
                            path="/administrator/theme"
                            element={
                                userIsAdmin ?
                                    <AdministratorPanelTheme /> :
                                    <NotFound />
                            }
                        />
                        <Route
                            path="/administrator/theme/:idTheme/questions"
                            element={
                                userIsAdmin ?
                                    <AdministratorPanelQuestion /> :
                                    <NotFound />
                            }
                        />
                        <Route
                            path="/administrator/theme/:idTheme/articles"
                            element={
                                userIsAdmin ?
                                    <AdministratorPanelArticle /> :
                                    <NotFound />
                            }
                        />
                        <Route
                            path="/administrator/theme/:idTheme/articles/:idArticle"
                            element={
                                userIsAdmin ?
                                    <ArticleEditor /> :
                                    <NotFound />
                            }
                        />
                        <Route
                            path="/test"
                            element={
                                <TextEditor />
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