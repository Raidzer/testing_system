import { Box, List } from '@mui/material';
import NavTheme from './NavTheme';
import { useSelector } from 'react-redux';
import { getDataThemes, getStatusLoadingThemes } from '../../store/themes';
import { useState } from 'react';

export default function NavThemes({ ...other }) {
    const themes = useSelector(getDataThemes());
    const isLoadingThemes = useSelector(getStatusLoadingThemes());
    const [isSelectedIdTheme, setIsSelectedIdTheme] = useState(null);

    const handleClickSelectedTheme = (id) => {
        setIsSelectedIdTheme(id);
    }

    return (
        <>
            {isLoadingThemes ? null :
                <Box {...other}>
                    <List disablePadding sx={{ p: 1 }}>
                        {themes.map((theme) => {
                            return <NavTheme
                                key={theme.id}
                                theme={theme}
                                handleClickSelectedTheme={handleClickSelectedTheme}
                                isSelectedIdTheme={isSelectedIdTheme}
                            />
                        })}
                    </List>
                </Box>
            }
        </>
    );
}