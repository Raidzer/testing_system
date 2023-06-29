import { Paper, Table, TableContainer, TablePagination } from "@mui/material";
import EnhancedTableToolbar from "./Table/EnhancedToolBar";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useParams } from "react-router";
import EnhancedTableHead from "./Table/EnhancedTableHead";
import AdminTableBody from "./Table/TableBody";
import { getComparator, stableSort } from "../../utils/sortTable";
import { getQuestions } from "../../service/data.service";
import { createQuestion, deleteQuestion, updateQuestion } from "../../service/admin.service";

function createData({ title, id }) {
    const name = title;

    return {
        name,
        id,
    };
}

export default function AdministratorPanelQuestion() {
    const [selected, setSelected] = useState([]);
    const { t } = useTranslation();
    const [idSelected, setIdSelected] = useState([]);
    const { pathname } = useLocation();
    const { idTheme } = useParams();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('theme');
    const [rows, setRows] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(12);
    const [page, setPage] = useState(0);
    const headCells = [
        {
            id: 'name',
            label: "Вопрос",
            minWidth: 250,
            align: 'center',
        },
    ]
    const menuItems = [
        {
            to: `${pathname}/${idSelected}`,
            text: "Редактировать вопрос",
        },
    ]
    const modalOptions = {
        "title": "Создание нового вопроса",
        "contentText": "Введите название вопроса:",
        "label": "Название вопроса",
        "createElement": createQuestion,
        "updateElement": updateQuestion,
    }

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        const data = await getQuestions(idTheme);
        const newRows = data.map((question, index) => createData(question, index))
        setRows(newRows)
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const visibleRows = useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage, rows],
    );

    const handleClick = (event, name, id) => {
        if (isSelected(id)) {
            setSelected([])
            setIdSelected([])
        } else {
            setSelected([name])
            setIdSelected([id])
        }
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (id) => idSelected.indexOf(id) !== -1;

    return (
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
                title="Список созданных вопросов"
                lableActionButton="Вопрос"
                idSelected={idSelected}
                menuItems={menuItems}
                modalOptions={modalOptions}
                idTheme={idTheme}
                deleteElement={deleteQuestion}
                titleDeleteModalText="Вы уверены что хотите удалить выбранный вопрос?"
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
