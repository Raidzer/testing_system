import { useEffect, useState } from "react"
import httpService from "../service/http.service"
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, tableCellClasses } from "@mui/material"
import dateService from "../service/date.service"
import { Cached } from "@mui/icons-material";
import styled from "@emotion/styled";
import { AnimatedIcon } from "../layouts/navigator/styles";
import { useTranslation } from "react-i18next";



function createData({ count_correct_ticket, count_ticket, created_at, user_info }) {
    const allAnswers = count_ticket;
    const allUncorrectAnswers = count_ticket - count_correct_ticket;
    const allCorrectAnswers = count_correct_ticket;
    const percentageOfCorrectAnswers = `${Math.round(allCorrectAnswers / allAnswers * 100)} %`
    const firstName = user_info.first_name;
    const lastName = user_info.last_name;
    const date = dateService.getDate(created_at);
    const time = dateService.getTime(created_at);

    return {
        allAnswers,
        allUncorrectAnswers,
        allCorrectAnswers,
        firstName,
        lastName,
        date: `${date}, ${time}`,
        percentageOfCorrectAnswers,
    }
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#f0f0f0",
    },
}));

export const UserStatistics = () => {
    const [userStatistics, setUserStatistics] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(12);
    const { t } = useTranslation();

    const columns = [
        {
            id: 'lastName',
            label: t('last_name'),
            minWidth: 100,
            align: 'center',
        },
        {
            id: 'firstName',
            label: t('first_name'),
            minWidth: 100,
            align: 'center',
        },
        {
            field: 'percentageOfCorrectAnswers',
            headerName: t("user_statistics.correct_answers"),
            flex: 1,
        },
        {
            field: 'date',
            headerName: t("user_statistics.date_exam"),
            flex: 1,
        },
    ];

    useEffect(() => {
        getUserStatistics();
    }, [])

    const getUserStatistics = async () => {
        const { data } = await httpService.get('statistics');
        setUserStatistics(data);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }

    const handleClickRefresh = () => {
        getUserStatistics();
    }

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <style>
                {`
        .MuiTablePagination-root {
            background-color: #f0f0f0;
        }
        `}
            </style>
            <TableContainer sx={{ minHeight: 759, maxHeight: 759 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <StyledTableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userStatistics
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((statistic, index) => {
                                const row = createData(statistic);
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {value}
                                                </TableCell>
                                            )
                                        })}
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{ position: 'relative' }}>
                <TablePagination
                    rowsPerPageOptions={[12, 24, 50]}
                    component="div"
                    count={userStatistics.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                >
                </TablePagination>
                <AnimatedIcon
                    style={{
                        position: 'absolute',
                        top: '10px',
                        left: '20px'
                    }}
                    onClick={handleClickRefresh}
                >
                    <Cached
                        sx={{
                            fontSize: 20
                        }}
                        color="action"
                    />
                </AnimatedIcon>
            </div>
        </Paper>
    );
}