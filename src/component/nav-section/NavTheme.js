import PropTypes from 'prop-types';
import { Box, List } from '@mui/material';
import NavItem from './NavItem';

NavTheme.propTypes = {
    data: PropTypes.array,
};

export default function NavTheme({ data = [], ...other }) {
    return (
        <Box {...other}>
            <List disablePadding sx={{ p: 1 }}>
                {data.map((item) => (
                    <NavItem key={item.title} item={item} />
                ))}
            </List>
        </Box>
    );
}