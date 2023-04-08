import { Link as RouterLink } from "react-router-dom";
import { Link as MuiLink, LinkProps as MuiLinkProps } from "@mui/material";

interface CustomLinkProps extends MuiLinkProps {
  to: string;
  component?: React.ElementType;
}

const CustomLink: React.FC<CustomLinkProps> = ({
  to,
  component = RouterLink,
  ...rest
}) => {
  return <MuiLink component={component} to={to} {...rest} />;
};

export default CustomLink;
