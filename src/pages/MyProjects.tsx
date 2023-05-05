import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import Header from "../components/Layout/Header";
import HeroBanner from "../components/pages/project/myProjects/HeroBanner";
import store from "../store";
import { Designations } from "../constants/options";
import { projects } from "../constants/project";
import Project from "../components/pages/project/myProjects/Project";

const MyProjects = () => {
  const { user } = store.getState();
  return (
    <Stack>
      <Header />
      <HeroBanner />
      <Stack mx={12} mt={5} gap="25px" pb={8}>
        <Box className="flex justify-between items-center">
          <Typography variant="h5">My Project</Typography>
          {user.role === Designations.CHIEF_ENGINEER ? (
            <Button variant="contained">Create New +</Button>
          ) : null}
        </Box>
        <Grid container spacing={3} justifyContent={"stretch"}>
          {projects.map((project) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={project.id}>
              <Project project={project} />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Stack>
  );
};

export default MyProjects;
