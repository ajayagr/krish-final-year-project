import { Stack, Typography } from "@mui/material";
import BreadCrumb, { PathType } from "../../components/BreadCrumb";

const Estimation = () => {
  return (
    <Stack>
      <BreadCrumb pathType={PathType.estimation} />
      <Typography variant="h4">This is project estimation page</Typography>
    </Stack>
  );
};

export default Estimation;
