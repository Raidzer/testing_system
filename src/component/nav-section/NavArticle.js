import { useEffect, useState } from "react";
import httpService from '../../service/http.service';
import { NavLink as RouterLink } from 'react-router-dom';
import { List, ListItemButton, ListItemText, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { getDataArticle } from "../../store/lesson";
import { LinkButton } from "../LinkButton";
import { School } from "@mui/icons-material";

export default function NavArticles({ id }) {
    const [articles, setArticles] = useState([]);
    const dispatch = useDispatch();



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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
                            <ListItemText disableTypography >
                                <Typography variant="body3" style={{ paddingLeft: '10px' }}>
                                    {title}
                                </Typography>
                            </ListItemText>
                        </ListItemButton>
                    )
                })
            }

            <LinkButton
                link={`/test/${id}`}
                text={'тест по теме'}
                startIcon={< School />}
            />
        </List>
    )
}