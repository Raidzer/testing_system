import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { getDataThemes, getStatusLoadingThemes } from "../../store/themes";
import {
    Paper,
    Table,
    TableContainer,
    TablePagination,
} from "@mui/material";
import { IsLoading } from "../IsLoading";
import EnhancedTableToolbar from "./Table/EnhancedToolBar";
import EnhancedTableHead from "./Table/EnhancedTableHead";
import AdminTableBody from "./Table/TableBody";
import { getComparator, stableSort } from "../../utils/sortTable";

const headCells = [
    {
        id: 'name',
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
    const name = subject;
    const articles = id;
    const tickets = 10 + id;

    return {
        name,
        articles,
        tickets,
        id,
    };
}

export default function AdministratorPanel() {
    const themes = useSelector(getDataThemes());
    const themesIsLoading = useSelector(getStatusLoadingThemes());
    const [selected, setSelected] = useState([]);
    const [idSelected, setIdSelected] = useState([]);
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

    const handleClick = (event, theme, id) => {
        if (isSelected(theme)) {
            setSelected([])
            setIdSelected([])
        } else {
            setSelected([theme])
            setIdSelected([id])
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

    const menuItems = [
        {
            to: `/administrator/theme/${idSelected}/articles`,
            text: "Изменить главу"
        },
        {
            to: `/administrator/theme/${idSelected}/questions`,
            text: "Изменить вопросы"
        }
    ]

    const modalOptions = {
        "title": "Создание новой темы",
        "contentText": "Введите название темы:",
        "label": "Название темы"
    }

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
                    idSelected={idSelected}
                    menuItems={menuItems}
                    modalOptions={modalOptions}
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
                        {themesIsLoading ? <IsLoading /> :
                            <AdminTableBody
                                rows={visibleRows}
                                headCells={headCells}
                                isSelected={isSelected}
                                handleClick={handleClick}
                            />
                        }
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