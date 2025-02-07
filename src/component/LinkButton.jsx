import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export const LinkButton = (props) => {
  return (
    <Link to={props.link}>
      <Button
        variant="contained"
        size="large"
        fullWidth
        startIcon={props.startIcon}
        sx={{ width: "100%" }}
        style={{
          backgroundColor: "#9e9e9e1f",
          color: "#43a047",
        }}
      >
        {props.text}
      </Button>
    </Link>
  );
};
