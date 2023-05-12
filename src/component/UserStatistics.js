import { useEffect, useState } from "react"
import httpService from "../service/http.service"
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material"
import dateService from "../service/data.service"

const columns = [
    {
        id: 'lastName',
        label: 'Фамилия',
        minWidth: 100,
        align: 'center',
    },
    {
        id: 'firstName',
        label: 'Имя',
        minWidth: 100,
        align: 'center',
    },
    {
        id: 'percentageOfCorrectAnswers',
        label: 'Процент правильных ответов',
        minWidth: 70,
        align: 'center',
    },
    {
        id: 'date',
        label: 'Дата прохождения теста',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'time',
        label: 'Время прохождения теста',
        minWidth: 170,
        align: 'center',
    },
];

function createData({ count_correct_ticket, count_ticket, created_at, user_info }) {
    const allAnswers = count_ticket;
    const allUncorrectAnswers = count_ticket - count_correct_ticket;
    const allCorrectAnswers = count_correct_ticket;
    const percentageOfCorrectAnswers = Math.round(allCorrectAnswers / allAnswers * 100)
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
        date,
        time,
        percentageOfCorrectAnswers,
    }
}

export const UserStatistics = () => {
    const [userStatistics, setUserStatistics] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(12);

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

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ minHeight: 800, maxHeight: 800 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
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
            <TablePagination
                rowsPerPageOptions={[12, 24, 50]}
                component="div"
                count={userStatistics.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}