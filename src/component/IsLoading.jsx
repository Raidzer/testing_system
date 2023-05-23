import { CircularProgress } from "@mui/material"

export const IsLoading = () => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '94vh',
            }}
        >
            <div>
                <CircularProgress color="inherit" />
            </div>
        </div>
    )
};