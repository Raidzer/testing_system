import { useEffect, useState } from "react"
import httpService from "../service/http.service"
import dateService from "../service/date.service"
import { DataGrid, ruRU } from '@mui/x-data-grid';
import { useTranslation } from "react-i18next";


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

export default function UserStatistics() {
    const [userStatistics, setUserStatistics] = useState([])
    const { t } = useTranslation();
    const [isLoading, setIsloadig] = useState(true);
    const columns = [
        {
            field: 'id',
            hideable: false,
        },
        {
            field: 'lastName',
            headerName: t("last_name"),
            flex: 1,
        },
        {
            field: 'firstName',
            headerName: t("first_name"),
            flex: 1,
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
        setIsloadig(true);
        const { data } = await httpService.get('statistics');
        const newRows = data.map((statistic, index) => createData(statistic, index))
        setUserStatistics(newRows);
        setTimeout(() => {
            setIsloadig(false);
        }, 1000);
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
                loading={isLoading}
            />
        </div>
    );
}