import { useEffect, useState } from "react";
import { NavLink as RouterLink } from 'react-router-dom';
import { List, ListItemButton, ListItemText, Skeleton, Typography } from "@mui/material";
import { LinkButton } from "../LinkButton";
import { School } from "@mui/icons-material";
import { getArticles } from "../../service/data.service";
import { useTranslation } from "react-i18next";

export default function NavArticles({ id }) {
    const [articles, setArticles] = useState([]);
    const [isLoadingArticles, setIsLoadingArticles] = useState(true);
    const [isSelectedArticles, setIsSelectedArticles] = useState(null);
    const { t } = useTranslation();


    const fetchData = async () => {
        setIsLoadingArticles(true);
        setArticles([]);
        try {
            const data = await getArticles(id);
            setArticles(data);
            setTimeout(() => {
                setIsLoadingArticles(false);
            }, 500)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const hundleClickListButton = (id) => {
        setIsSelectedArticles(id)
        console.log(id)
    }

    return (
        <>
            {isLoadingArticles ?
                <Skeleton sx={{ height: 50 }} animation="wave" /> :
                <List>
                    {
                        articles.map((article) => {
                            const { id, title } = article;
                            const isSelected = id === isSelectedArticles;

                            return (
                                <ListItemButton
                                    component={RouterLink}
                                    to={`/${id}`}
                                    key={id}
                                    onClick={() => hundleClickListButton(id)}
                                    sx={{ backgroundColor: isSelected ? 'lightgrey' : 'transparent' }}
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
                        text={t('nav.title_test')}
                        startIcon={< School />}
                    />
                </List>
            }
        </>

    )
}