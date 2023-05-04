import { Stack, Typography } from "@mui/material";
import BreadCrumb, { PathType } from "../../components/BreadCrumb";

const Plans = () => {
  return (
    <Stack>
      <BreadCrumb pathType={PathType.plans} />
      <Typography variant="h4">This is project plans page</Typography>
    </Stack>
  );
};

export default Plans;
