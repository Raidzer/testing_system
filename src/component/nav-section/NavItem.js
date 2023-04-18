import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
import { Collapse, List, ListItemButton, ListItemText } from '@mui/material';
import { useState } from 'react';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

NavItem.propTypes = {
    item: PropTypes.object,
};

export default function NavItem({ item }) {
    const { title, path } = item;

    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(!open);
    }

    return (
        <List>
            <ListItemButton onClick={handleClick}>
                <ListItemText disableTypography primary={title} sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    wordWrap: 'break-word',
                    display: 'inline-block'
                }} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <ListItemButton
                    component={RouterLink}
                    to={path}
                >
                    <ListItemText disableTypography primary={title} />
                </ListItemButton>
            </Collapse>
        </List>
    );
}
