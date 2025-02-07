import { Collapse, List, ListItemButton, ListItemText, Typography } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import NavArticles from './NavArticle';


export default function NavTheme({ theme, handleClickSelectedTheme, isSelectedIdTheme }) {
    const { id, title } = theme;

    const handleClick = (id) => {
        if (isSelectedIdTheme === id) {
            handleClickSelectedTheme(null);
        } else {
            handleClickSelectedTheme(id);
        }
    }

    return (
        <List >
            <ListItemButton onClick={() => handleClick(id)}>
                <ListItemText disableTypography sx={{
                    whiteSpace: 'wrap',
                    overflow: 'hidden',
                    wordWrap: 'break-word',
                    display: 'inline-block'
                }}>
                    <Typography variant="h6">
                        {title}
                    </Typography>
                </ListItemText>
                {isSelectedIdTheme === id ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={isSelectedIdTheme === id} timeout="auto" unmountOnExit>
                <NavArticles id={id} />
            </Collapse>
        </List>
    );
}
