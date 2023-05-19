import { useEffect, useState } from "react";
import { NavLink as RouterLink } from 'react-router-dom';
import { List, ListItemButton, ListItemText, Skeleton, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { getDataArticle } from "../../store/lesson";
import { LinkButton } from "../LinkButton";
import { School } from "@mui/icons-material";
import { getArticles } from "../../service/data.service";
import { isEmpty } from "../../utils/utilsArray";

export default function NavArticles({ id }) {
    const [articles, setArticles] = useState([]);
    const dispatch = useDispatch();

    const fetchData = async () => {
        const data = await getArticles(id);
        setArticles(data);
    }
    const handleClick = (id) => {
        dispatch(getDataArticle({
            payload: {
                id,
            }
        }));
    }

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {isEmpty(articles) ?
                <Skeleton sx={{ height: 50 }} animation="wave" /> :
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
            }
        </>

    )
}