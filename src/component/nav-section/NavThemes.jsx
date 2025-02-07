import { Box, List } from "@mui/material";
import NavTheme from "./NavTheme";
import { useDispatch, useSelector } from "react-redux";
import {
  getDataThemes,
  getSelectedThemeId,
  getStatusLoadingThemes,
  setThemeId,
} from "../../store/themes";

export default function NavThemes({ ...other }) {
  const themes = useSelector(getDataThemes());
  const isLoadingThemes = useSelector(getStatusLoadingThemes());
  const dispatch = useDispatch();
  const isSelectedIdTheme = useSelector(getSelectedThemeId());

  const handleClickSelectedTheme = async (id) => {
    await dispatch(setThemeId(id));
  };

  return (
    <>
      {isLoadingThemes ? null : (
        <Box {...other}>
          <List sx={{ p: 1 }}>
            {themes.map((theme) => {
              return (
                <NavTheme
                  key={theme.id}
                  theme={theme}
                  handleClickSelectedTheme={handleClickSelectedTheme}
                  isSelectedIdTheme={isSelectedIdTheme}
                />
              );
            })}
          </List>
        </Box>
      )}
    </>
  );
}
