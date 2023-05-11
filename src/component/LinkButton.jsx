import { Box, Button } from "@mui/material"
import { Link } from "react-router-dom"

export const LinkButton = (props) => {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Link to={props.link}>
                <Button
                    variant="contained"
                    size='large'
                    startIcon={props.startIcon}
                    sx={{ width: 253 }}
                    style={{
                        backgroundColor: '#9e9e9e1f',
                        color: '#43a047',
                    }}
                >
                    {props.text}
                </Button>
            </Link>
        </Box>
    )
}