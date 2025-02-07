import { useEffect, useRef, useState } from "react";
import { NavLink as RouterLink } from "react-router-dom";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Skeleton,
  Typography,
} from "@mui/material";
import { LinkButton } from "../LinkButton";
import { School } from "@mui/icons-material";
import { getArticles } from "../../service/data.service";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getSelectedArticleId, setSelectedArticleId } from "../../store/themes";

export default function NavArticles({ id }) {
  const [articles, setArticles] = useState([]);
  const [isLoadingArticles, setIsLoadingArticles] = useState(true);
  const isSelectedArticles = useSelector(getSelectedArticleId(), shallowEqual);
  const listItemRefs = useRef(new Map());
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const fetchData = async () => {
    setIsLoadingArticles(true);
    setArticles([]);
    try {
      const data = await getArticles(id);
      setArticles(data);
      setTimeout(() => {
        setIsLoadingArticles(false);
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hundleClickListButton = (id) => {
    dispatch(setSelectedArticleId(id));
  };

  useEffect(() => {
    if (isSelectedArticles) {
      if (listItemRefs.current.get(isSelectedArticles)) {
        listItemRefs.current.get(isSelectedArticles).scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [isSelectedArticles]);

  return (
    <>
      {isLoadingArticles ? (
        <Skeleton sx={{ height: 50 }} animation="wave" />
      ) : (
        <List>
          {articles.map((article, index) => {
            const { id, title } = article;
            const isSelected = id === isSelectedArticles;

            return (
              <ListItemButton
                component={RouterLink}
                to={`/${id}`}
                key={id}
                onClick={() => hundleClickListButton(id)}
                selected={isSelected}
                ref={(el) => listItemRefs.current.set(article.id, el)}
              >
                <ListItemText disableTypography>
                  <Typography variant="body3" style={{ paddingLeft: "10px" }}>
                    {title}
                  </Typography>
                </ListItemText>
              </ListItemButton>
            );
          })}
          <Box sx={{marginTop: 2}}>
            <LinkButton
              link={`/test/${id}`}
              text={t("nav.title_test")}
              startIcon={<School />}
            />
          </Box>
        </List>
      )}
    </>
  );
}
