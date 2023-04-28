import { Collapse, List, ListItemButton, ListItemText } from '@mui/material';
import { useState } from 'react';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import NavArticles from './NavArticle';


export default function NavTheme({ theme }) {
    const { id, subject } = theme;

    const [open, setOpen] = useState(false);
    
    const handleClick = () => {
        setOpen(!open);
    }

    return (
        <List>
            <ListItemButton onClick={handleClick}>
                <ListItemText disableTypography primary={subject} sx={{
                    whiteSpace: 'wrap',
                    overflow: 'hidden',
                    wordWrap: 'break-word',
                    display: 'inline-block'
                }} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <NavArticles id={id} />
            </Collapse>
        </List>
    );
}
