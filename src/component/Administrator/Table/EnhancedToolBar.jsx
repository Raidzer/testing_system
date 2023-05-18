import { LibraryAdd, Mode } from "@mui/icons-material";
import { IconButton, Toolbar, Tooltip, Typography, alpha } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

export default function EnhancedTableToolbar(props) {
    const { selected, title, lableActionButton } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(selected.length > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {selected.length > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {selected}
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    {title}
                </Typography>
            )}
            {selected.length > 0 ? (
                <>
                    <Tooltip title={`Изменить ${lableActionButton}`}>
                        <IconButton>
                            <Mode />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={`Удалить ${lableActionButton}`}>
                        <IconButton>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </>
            ) : (
                <Tooltip title={`Добавить ${lableActionButton}`}>
                    <IconButton>
                        <LibraryAdd />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
}