import { styled } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useState } from "react";
import CustomLink from "../routing/CustomLink";
import { useLocation } from "react-router";
import Logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";

const StyledLink = styled(CustomLink)(({ theme }) => ({
  marginRight: "16px",
  textDecoration: "none",
  color: theme.palette.primary.main,
  fontSize: "1.2rem",
  fontWeight: 600,
}));

const StyledAvatar = styled(Avatar)({
  width: "32px",
  height: "32px",
  cursor: "pointer",
});

const StyledAppBar = styled(AppBar)({
  backgroundColor: "white",
});

const hideHeaderLinks = ["auth"];

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  if (hideHeaderLinks.some((link) => location.pathname.includes(link))) {
    return null;
  }
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledAppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <CustomLink to="/home">
          <img src={Logo} alt="logo" />
        </CustomLink>
        <div style={{ display: "flex", alignItems: "center" }}>
          <StyledLink to="/home">Home</StyledLink>
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton color="inherit" sx={{ mr: "24px" }}>
              <Badge badgeContent={3} color="secondary">
                <NotificationsIcon htmlColor="black" />
              </Badge>
            </IconButton>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <StyledAvatar src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"></StyledAvatar>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={() => navigate("/")}>Logout</MenuItem>
            </Menu>
          </div>
        </div>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
