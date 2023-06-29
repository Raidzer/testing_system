import { Box, List } from '@mui/material';
import NavTheme from './NavTheme';
import { useSelector } from 'react-redux';
import { getDataThemes, getStatusLoadingThemes } from '../../store/themes';

export default function NavThemes({ ...other }) {
    const themes = useSelector(getDataThemes());
    const isLoadingThemes = useSelector(getStatusLoadingThemes());

    return (
        <>
            {isLoadingThemes ? null :
                <Box {...other}>
                    <List disablePadding sx={{ p: 1 }}>
                        {themes.map((theme) => {
                            return <NavTheme key={theme.id} theme={theme} />
                        })}
                    </List>
                </Box>
            }
        </>
    );
}