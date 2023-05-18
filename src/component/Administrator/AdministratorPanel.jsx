import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { getDataThemes } from "../../store/themes";
import {
    Box,
    Checkbox,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Toolbar,
    Tooltip,
    Typography,
    alpha
} from "@mui/material";
import { visuallyHidden } from '@mui/utils';
import { IsLoading } from "../IsLoading";
import DeleteIcon from '@mui/icons-material/Delete';
import { LibraryAdd, Mode } from "@mui/icons-material";

const headCells = [
    {
        id: 'theme',
        label: 'Тема',
        minWidth: 250,
        align: 'center',
    },
    {
        id: 'articles',
        label: 'Кол-во глав',
        minWidth: 250,
        align: 'center',
    },
    {
        id: 'tickets',
        label: 'Кол-во вопросов',
        minWidth: 250,
        align: 'center',
    },
]

function createData({ subject, id }) {
    const theme = subject;
    const articles = id;
    const tickets = 10 + id;

    return {
        theme,
        articles,
        tickets,
    };
}

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
    const {
        order,
        orderBy,
        onRequestSort
    } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

function EnhancedTableToolbar(props) {
    const { selectedTheme } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(selectedTheme.length > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {selectedTheme.length > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {selectedTheme}
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Список созданных тем
                </Typography>
            )}
            {selectedTheme.length > 0 ? (
                <>
                    <Tooltip title="Изменить тему">
                        <IconButton>
                            <Mode />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Удалить тему">
                        <IconButton>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </>
            ) : (
                <Tooltip title="Добавить тему">
                    <IconButton>
                        <LibraryAdd />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
}

export default function AdministratorPanel() {
    const themes = useSelector(getDataThemes())
    const [selected, setSelected] = useState([]);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('theme');
    const [rows, setRows] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(12);
    const [page, setPage] = useState(0);

    useEffect(() => {
        setRows([]);
        themes.forEach((theme, index) => {
            setRows((prevRows) => [...prevRows, createData(theme, index)]);
        });
    }, [themes])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.theme);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleClick = (event, theme) => {
        if (isSelected(theme)) {
            setSelected([])
        } else {
            setSelected(theme)
        }
    }

    const isSelected = (theme) => selected.indexOf(theme) !== -1;
    const isLoading = () => rows.length !== themes.length;

    const visibleRows = useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage, rows],
    );

    return isLoading() ? <IsLoading /> :
        (
            <Paper
                sx={{
                    width: '100%',
                    mb: 2,
                }}
            >
                <style>
                    {`
        .MuiTablePagination-root {
            background-color: #f0f0f0;
        }
        .MuiTableHead-root {
            background-color: #f0f0f0; 
        }
        `}
                </style>
                <EnhancedTableToolbar selectedTheme={selected} />
                <TableContainer sx={{ minHeight: 759, maxHeight: 759 }}>
                    <Table
                        sx={{
                            minWidth: 750,
                        }}
                        aria-labelledby="tableTitle"
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody
                            sx={{
                                width: "100%",
                            }}
                        >
                            {visibleRows.map((row, index) => {
                                const isItemSelected = isSelected(row.theme);
                                const labelId = `enhanced-table-checkbox-${index}`;
                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, row.theme)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.theme}
                                        selected={isItemSelected}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}
                                            />
                                        </TableCell>
                                        {headCells.map((cell) => {
                                            const value = row[cell.id]
                                            return (
                                                <TableCell
                                                    key={cell.id}
                                                    align={cell.align}
                                                >
                                                    {value}
                                                </TableCell>
                                            )
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[12, 24, 50]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        )
}