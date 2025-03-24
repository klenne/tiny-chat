import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1, width: "100vw" }}>
      <AppBar
        component="nav"
        position="static"
        sx={{ backgroundColor: "#F8F8F8", color: "black" }}
        elevation={0}
      >
        <Toolbar>
          <Typography
            variant="h3"
            component="div"
            sx={{ flexGrow: 1, justifySelf: "flex-start", fontFamily: "IBM Plex Mono" }}
          >
            Tiny Chat
          </Typography>

          <IconButton
            sx={{
              color: "#858e99",
              marginLeft: 1,
            }}
            onClick={() => {
              navigate("/config");
            }}
          >
            <SettingsSuggestIcon
              sx={{
                fontSize: "2.2rem",
              }}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
