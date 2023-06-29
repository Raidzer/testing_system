/* eslint-disable react-hooks/exhaustive-deps */
import { Paper, Table, TableContainer, TablePagination } from "@mui/material";
import EnhancedTableToolbar from "./EnhancedToolBar";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router";
import EnhancedTableHead from "./EnhancedTableHead";
import AdminTableBody from "./TableBody";
import { getComparator, stableSort } from "../../../utils/sortTable";
import { IsLoading } from "../../IsLoading";

export default function AdministratorPanel(props) {
    const {
        headCells,
        modalOptions,
        toolbarOptions,
        menuItemsOption,
        createData,
        functionFetchData,
    } = props;

    const { pathname } = useLocation();
    const [selected, setSelected] = useState([]);
    const [idSelected, setIdSelected] = useState([]);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('theme');
    const [rows, setRows] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(12);
    const { idTheme } = useParams();
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);


    const menuItems = menuItemsOption.map((item, index) => {
        return {
            to: `${pathname}/${idSelected}${item.to}`,
            text: item.text,
        }
    })

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const data = await functionFetchData(idTheme);
            const newRows = data.map((item, index) => createData(item, index));
            setRows(newRows);
            setTimeout(() => {
                setIsLoading(false);
            }, 1000)
        } catch (error) {
            console.log(error);
        }
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
        <>
            {isLoading ? <IsLoading /> :
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
                        title={toolbarOptions.title}
                        lableActionButton={toolbarOptions.lableActionButton}
                        idSelected={idSelected}
                        menuItems={menuItems}
                        modalOptions={modalOptions}
                        idTheme={idTheme}
                        deleteElement={toolbarOptions.deleteElement}
                        titleDeleteModalText={toolbarOptions.titleDeleteModalText}
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
            }
        </>
    )
}
