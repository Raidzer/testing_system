import { Box, List } from '@mui/material';
import { useEffect, useState } from 'react';
import httpService from '../../service/http.service';
import NavTheme from './NavTheme';



export default function NavThemes({ ...other }) {
    const [themes, setThemes] = useState([]);

    const getThemes = async () => {
        try {
            const { data } = await httpService.get('themes')
            setThemes(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getThemes();
    }, [])

    return (
        <Box {...other}>
            <List disablePadding sx={{ p: 1 }}>
                {themes.map((theme) => {
                    return <NavTheme key={theme.id} theme={theme} />
                })}
            </List>
        </Box>
    );
}