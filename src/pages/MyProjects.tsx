import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import Header from "../components/Layout/Header";
import HeroBanner from "../components/pages/project/myProjects/HeroBanner";
import { RootState } from "../store";
import { Designations } from "../constants/options";
import Project from "../components/pages/project/myProjects/Project";
import CustomLink from "../components/routing/CustomLink";
import { useSelector } from "react-redux";

const MyProjects = () => {
  const { user, projects } = useSelector((store: RootState) => store);
  return (
    <Stack>
      <Header />
      <HeroBanner />
      <Stack mx={12} mt={5} gap="25px" pb={8}>
        <Box className="flex justify-between items-center">
          <Typography variant="h5">My Project</Typography>
          {user.role === Designations.CHIEF_ENGINEER ? (
            <CustomLink to="/projects/new">
              <Button variant="contained">Create New +</Button>
            </CustomLink>
          ) : null}
        </Box>
        <Grid container spacing={3} justifyContent={"stretch"}>
          {projects.projects.map((project) => (
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
