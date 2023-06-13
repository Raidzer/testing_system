import { useEffect, useState } from "react";
import { NavLink as RouterLink } from 'react-router-dom';
import { List, ListItemButton, ListItemText, Skeleton, Typography } from "@mui/material";
import { LinkButton } from "../LinkButton";
import { School } from "@mui/icons-material";
import { getArticles } from "../../service/data.service";
import { isEmpty } from "../../utils/utilsArray";
import { useTranslation } from "react-i18next";

export default function NavArticles({ id }) {
    const [articles, setArticles] = useState([]);
    const { t } = useTranslation();

    const fetchData = async () => {
        const data = await getArticles(id);
        setArticles(data);
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
                                    to={`/${id}`}
                                    key={id}
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