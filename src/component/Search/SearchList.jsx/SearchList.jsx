import { useDispatch, useSelector } from "react-redux";
import { searchList } from "../../../store/searchStore";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { setSelectedArticleId, setThemeId } from "../../../store/themes";

const SearchList = ({ query }) => {
  const dataList = useSelector(searchList());
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = async (idArticle, idTheme) => {
    await dispatch(setThemeId(idTheme));
    dispatch(setSelectedArticleId(idArticle));
    navigate(`/${idArticle}?query=${query}`);
  };

  return (
    <>
      {" "}
      {dataList.length > 0 && (
        <List style={{ marginTop: "20px" }}>
          {dataList.map((item, index) => (
            <ListItem
              key={index}
              alignItems="flex-start"
              sx={{
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                },
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
            >
              <ListItemText
                primary={`Тема:${item.titleTheme}`}
                onClick={() => handleClick(item.idArticle, item.idTheme)}
                secondary={
                  <>
                    <Typography
                      sx={{ marginLeft: 3 }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {" Глава: " + item.titleArticle}
                    </Typography>
                    <br />
                    <Typography
                      sx={{
                        marginLeft: 5,
                      }}
                      component="span"
                      variant="body2"
                      color="text.secondary"
                    >
                      {item.descriptionPart}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
      {dataList.length === 0 && (
        <Typography variant="body1" style={{ marginTop: "20px" }}>
          Нет результатов поиска....
        </Typography>
      )}
    </>
  );
};

export default SearchList;
