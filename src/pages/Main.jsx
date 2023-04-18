import React from "react";
import { styled } from '@mui/material/styles';
import Nav from "../layouts/navigator/nav";
import { Box } from '@mui/material';


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

    return (
        <StyledRoot>
            <Box sx={{ flexShrink: 0 }}>
                <StyledNav>
                    <Nav />
                </StyledNav>
            </Box>
            <StyledContent>
                
            </StyledContent>
        </StyledRoot>
    );
};