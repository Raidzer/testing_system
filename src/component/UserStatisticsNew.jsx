import { useEffect, useState } from "react"
import httpService from "../service/http.service"
import dateService from "../service/date.service"
import { DataGrid, GridToolbar, ruRU } from '@mui/x-data-grid';

const columns = [
    {
        field: 'id',
        hideable: false,
    },
    {
        field: 'lastName',
        headerName: 'Фамилия',
        flex: 1,
    },
    {
        field: 'firstName',
        headerName: 'Имя',
        flex: 1,
    },
    {
        field: 'percentageOfCorrectAnswers',
        headerName: 'Правильные ответы',
        flex: 1,
    },
    {
        field: 'date',
        headerName: 'Дата прохождения экзамена',
        flex: 1,
    },
];

function createData({ count_correct_ticket, count_ticket, created_at, user_info }, id) {
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
        id,
    }
}

export default function UserStatisticsNew() {
    const [userStatistics, setUserStatistics] = useState([])

    useEffect(() => {
        getUserStatistics();
    }, [])

    const getUserStatistics = async () => {
        const { data } = await httpService.get('statistics');
        const newRows = data.map((statistic, index) => createData(statistic, index))
        setUserStatistics(newRows);
    }

    return (
        <div style={{ height: "91vh", width: "100%" }}>
            <DataGrid
                rows={userStatistics}
                columns={columns}
                localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                initialState={{
                    columns: {
                        columnVisibilityModel: {
                            id: false,
                        },
                    },
                    pagination: {
                        paginationModel: {
                            pageSize: 14
                        }
                    },
                }}
                pageSizeOptions={[14, 28, 56]}
            />
        </div>
    );
}