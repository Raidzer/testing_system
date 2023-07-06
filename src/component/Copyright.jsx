import { Box, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import { useEffect, useState } from "react";
import httpService from "../service/http.service";
import configFile from "../config.json";

function Copyright(props) {
    const [versionBackend, setVersionBackend] = useState({ time_commit: "10:00", version: "какая-то" });
    const [isHovered, setIsHovered] = useState(false);
    const [sumClick, setSumClick] = useState(0);
    
    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        if (sumClick > 5) {
            setIsHovered(true)
        } else {
            setIsHovered(false)
        }
    }, [sumClick])

    const hundleClick = () => {
        setSumClick(sumClick + 1);
    }

    const fetchData = async () => {
        const { data } = await httpService.get('/version');
        setVersionBackend(data);
    }
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'АО "Алгонт" © '}
            <Link
                color="inherit"
                href="#"
                onClick={hundleClick}
            >
                Система обучения
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
            <br />
            {isHovered &&
                <>
                    <span>Вот ты какой молодец
                        <br />
                        на тебе версию софта за это:
                        <br />
                    </span>
                    <span>
                        Версия бекенда:
                        <br />
                        {`Последнее изменение: ${versionBackend.time_commit},\n 
                        Текущаяя ветка: ${versionBackend.version}`}
                        <br />
                    </span>
                    <span>
                        Версия фронтенда:
                        <br />
                        {configFile.VERSION}
                    </span>
                </>
            }
        </Typography>
    );
}

export default Copyright;