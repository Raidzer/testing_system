import { Typography } from "@mui/material";
import Link from "@mui/material/Link";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'АО "Алгонт" © '}
            <Link color="inherit" href="#">
                Система обучения
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default Copyright;