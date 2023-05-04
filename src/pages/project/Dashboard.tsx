import Application from "../../components/pages/project/dashboard/Application";
import { applicationList } from "../../constants/project";
import store from "../../store";
import { Typography, Stack } from "@mui/material";

const ProjectDashboard = () => {
  const { project } = store.getState();
  return (
    <section>
      <Typography variant="h3">{project.name}</Typography>
      <Typography variant="h4">Description</Typography>
      <Typography>{project.description}</Typography>
      <Typography variant="h4">My Applications</Typography>
      <Stack direction={"row"} role="list">
        {applicationList.map((application) => (
          <Application application={application} key={application.name} />
        ))}
      </Stack>
    </section>
  );
};

export default ProjectDashboard;
