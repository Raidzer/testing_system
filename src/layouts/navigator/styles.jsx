import styled from "@emotion/styled";
import { Icon } from "@mui/material";

export const AnimatedIcon = styled(Icon)({
    transition: 'transform 0.2s',
    '&:hover': {
        transform: 'scale(2.2)',
    },
    '&:active': {
        transform: 'scale(2.0)',
    },
    transform: 'scale(2.0)'
});