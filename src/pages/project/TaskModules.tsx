import { Stack, Typography } from "@mui/material";
import BreadCrumb, { PathType } from "../../components/BreadCrumb";

const TaskModules = () => {
  return (
    <Stack>
      <BreadCrumb pathType={PathType.taskModule} />
      <Typography variant="h4">This is project task module page</Typography>
    </Stack>
  );
};

export default TaskModules;
