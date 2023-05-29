import { useLocation, useParams } from "react-router"
import { IsLoading } from "../IsLoading";
import { Paper, Table, TableContainer, TablePagination } from "@mui/material";
import EnhancedTableToolbar from "./Table/EnhancedToolBar";
import EnhancedTableHead from "./Table/EnhancedTableHead";
import AdminTableBody from "./Table/TableBody";
import { useEffect, useMemo, useState } from "react";
import { getComparator, stableSort } from "../../utils/sortTable";
import { getArticles } from "../../service/data.service";
import { useDispatch } from "react-redux";
import { getDataArticle } from "../../store/lesson";
import { createArticle, deleteArticle, updateTitleArticle } from "../../service/admin.service";

const headCells = [
    {
        id: 'name',
        label: 'Глава',
        minWidth: 250,
        align: 'center',
    },
]

const modalOptions = {
    "title": "Создание новой главы",
    "contentText": "Введите название главы:",
    "label": "Название главы",
    "createElement": createArticle,
    "updateElement": updateTitleArticle,
}

function createData({ title, id }) {
    const name = title;

    return {
        name,
        id,
    };
}

export default function AdministratorPanelArticle() {
    const dispatch = useDispatch();
    const { idTheme } = useParams();
    const [articles, setArticles] = useState([]);
    const [selected, setSelected] = useState([]);
    const [idSelected, setIdSelected] = useState([]);
    const [rows, setRows] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(12);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('theme');
    const [page, setPage] = useState(0);
    const { pathname } = useLocation();

    const fetchData = async () => {
        const data = await getArticles(idTheme);
        setArticles(data);
        const newRows = data.map((article, index) => createData(article, index))
        setRows(newRows)
    }

    useEffect(() => {
        fetchData();
    }, [])

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

    const handleClick = (event, name, id) => {
        if (isSelected(name)) {
            setSelected([])
            setIdSelected([])
        } else {
            setSelected([name])
            setIdSelected([id])
        }
    }

    const isLoading = () => {
        return rows.length !== articles.length;
    }

    const isSelected = (name) => selected.indexOf(name) !== -1;

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
            to: `${pathname}/${idSelected}`,
            text: "Редактировать главу",
        },
    ]

    const getDataSelectedArticle = () => {
        dispatch(getDataArticle({
            payload: {
                id: idSelected,
            }
        }))
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
                    title='Список созданых глав'
                    lableActionButton='Главу'
                    idSelected={idSelected}
                    menuItems={menuItems}
                    getData={getDataSelectedArticle}
                    modalOptions={modalOptions}
                    idTheme={idTheme}
                    deleteElement={deleteArticle}
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
                        <AdminTableBody
                            rows={visibleRows}
                            headCells={headCells}
                            isSelected={isSelected}
                            handleClick={handleClick}
                        />
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