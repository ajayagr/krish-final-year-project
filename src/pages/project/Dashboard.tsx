import BreadCrumb from "../../components/BreadCrumb";
import Application from "../../components/pages/project/dashboard/Application";
import Contact from "../../components/pages/project/dashboard/Contact";
import { applicationList, contactList } from "../../constants/project";
import store from "../../store";
import { Typography, Stack, Box } from "@mui/material";

const ProjectDashboard = () => {
  const { project } = store.getState();
  return (
    <Stack direction="row">
      <Stack width="75%" pr={7}>
        <BreadCrumb />
        <Stack gap="30px">
          <Typography variant="h4">{project.name}</Typography>
          <Box>
            <Typography variant="h5">Description</Typography>
            <Typography mt={"20px"}>{project.description}</Typography>
          </Box>
          <Box>
            <Typography variant="h5">My Applications</Typography>
            <Stack direction={"row"} role="list" gap={4} mt="20px">
              {applicationList.map((application) => (
                <Application application={application} key={application.name} />
              ))}
            </Stack>
          </Box>
        </Stack>
      </Stack>
      <Stack gap="35px" borderLeft={"1px solid #D0D0D0"} pl={4}>
        <Typography variant="h5">Project Contacts</Typography>
        <Box>
          <Typography fontWeight={500}>Chief Engineer</Typography>
          <Box role="list" mt={2}>
            <Stack gap={2}>
              {contactList.CE.map((contact, idx) => (
                <Contact {...contact} key={`${contact.name}-${idx}`} />
              ))}
            </Stack>
          </Box>
        </Box>
        <Box mt={2}>
          <Typography fontWeight={500}>Site Engineer</Typography>
          <Box role="list" mt={2}>
            <Stack gap={2}>
              {contactList.SE.map((contact, idx) => (
                <Contact {...contact} key={`${contact.name}-${idx}`} />
              ))}
            </Stack>
          </Box>
        </Box>
      </Stack>
    </Stack>
  );
};

export default ProjectDashboard;
