import { useEffect, useState } from "react";
import httpService from '../../service/http.service';
import { Link, NavLink as RouterLink } from 'react-router-dom';
import { List, ListItemButton, ListItemText, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getDataArticle } from "../../store/lesson";
import { getSelectThemeId, setThemeId } from "../../store/themes";

export default function NavArticles({ id }) {
    const [articles, setArticles] = useState([]);
    const dispatch = useDispatch();
    const test = useSelector(getSelectThemeId());

    const getArticles = async () => {
        try {
            const { data } = await httpService.get(`/articles/theme/${id}`)
            setArticles(data);
        } catch (error) {
            console.log(error)
        }
    }

    const handleClick = (id) => {
        dispatch(getDataArticle({
            payload: {
                id,
            }
        }));
    }

    useEffect(() => {
        getArticles();
    }, [])


    const handleClickPassTest = (selectThemeId) => {
        dispatch(setThemeId({
            payload: {
                selectThemeId,
            }
        }))
    }

    return (
        <List>
            {
                articles.map((article) => {
                    const { id, title } = article;
                    return (
                        <ListItemButton
                            component={RouterLink}
                            to={'/'}
                            key={id}
                            onClick={() => handleClick(id)}
                        >
                            <ListItemText disableTypography primary={title} />
                        </ListItemButton>
                    )
                })
            }
            <Link to='/test'>
                <Button onClick={() => handleClickPassTest(id)}>Пройти тест по выбраной теме</Button>
            </Link>
        </List>
    )
}