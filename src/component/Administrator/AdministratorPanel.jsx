import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { getDataThemes } from "../../store/themes";
import {
    Checkbox,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow,
} from "@mui/material";
import { IsLoading } from "../IsLoading";
import EnhancedTableToolbar from "./EnhancedToolBar";
import EnhancedTableHead from "./EnhancedTableHead";

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
                <EnhancedTableToolbar
                    selected={selected}
                    title='Список созданых тем'
                    lableActionButton='Тему'
                />
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
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                            headCells={headCells}
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
                                                    align="center"
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