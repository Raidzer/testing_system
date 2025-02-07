import {
  Box,
  ClickAwayListener,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { AnimatedIcon } from "../../layouts/navigator/styles";
import { useState } from "react";
import { Face } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import authService from "../../service/auth.service";
import { logout } from "../../store/session";
import { styled, alpha } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { getUserIsAdmin } from "../../store/user";
import { useTranslation } from "react-i18next";

const StyledAccount = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  "flex-direction": "row",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

export const UserInfo = (props) => {
  const dispatch = useDispatch();
  const userIsAdmin = useSelector(getUserIsAdmin());
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { t } = useTranslation();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  async function handleLogout() {
    try {
      await authService.logout();
      dispatch(logout());
    } catch (error) {
      console.log(error);
      dispatch(logout());
    }
  }

  return (
    <StyledAccount>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ ml: 2, maxWidth: 150 }}>
          <Typography
            variant="subtitle2"
            sx={{
              color: "text.primary",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {props.firstName}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              color: "text.primary",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {props.lastName}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {userIsAdmin ? t("nav.title_admin") : t("nav.title_user")}
          </Typography>
        </Box>
        <Box>
          <AnimatedIcon
            sx={{ ml: 5, mr: 5 }}
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            id="basic-button"
            onClick={handleClick}
          >
            <Face />
          </AnimatedIcon>
          <ClickAwayListener
            mouseEvent="onMouseDown"
            touchEvent="onTouchStart"
            onClickAway={handleClose}
          >
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem component={Link} to="/statistics" onClick={handleClose}>
                {t("nav.statistics")}
              </MenuItem>
              {userIsAdmin ? (
                <MenuItem
                  component={Link}
                  to="/administrator/theme"
                  onClick={handleClose}
                >
                  {t("nav.control_panel")}
                </MenuItem>
              ) : null}
              <MenuItem onClick={handleLogout}>{t("exit")}</MenuItem>
            </Menu>
          </ClickAwayListener>
        </Box>
      </Box>
    </StyledAccount>
  );
};
