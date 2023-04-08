import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      Copyright ©
      <Link color="inherit" to="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}

const Footer = () => {
  return (
    <div>
      Footer
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </div>
  );
};

export default Footer;
