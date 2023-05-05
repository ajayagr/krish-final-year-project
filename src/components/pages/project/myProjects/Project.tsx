import { Chip, Stack, Typography, styled } from "@mui/material";
import { ProjectStatusDetails, TProject } from "../../../../constants/project";
import CustomLink from "../../../routing/CustomLink";
import { setProject } from "../../../../store/project";
import store from "../../../../store";

interface IProjectParams {
  project: TProject;
}

const ProjectCard = styled(CustomLink)(({ theme }) => ({
  backgroundColor: theme.palette.customBgColor.main,
}));

const ProjectImage = styled("img")({
  width: "100%",
  height: "144px",
});

const dateFormat = Intl.DateTimeFormat("en-IN", { dateStyle: "short" });

const Project = ({ project }: IProjectParams) => {
  const { name, start_date, end_date, budget, status, id, imageUrl } = project;

  const setProjectDetails = () => {
    store.dispatch(setProject(project));
  };

  return (
    <ProjectCard
      to={`/project/${id}/dashboard`}
      underline="none"
      onClick={setProjectDetails}
    >
      <div className="relative" style={{ width: "100%" }}>
        <ProjectImage src={imageUrl} alt={name} />
        <Chip
          label={ProjectStatusDetails[status].title}
          sx={{
            color: "white",
            bgcolor: ProjectStatusDetails[status].bgColor,
          }}
          className="absolute bottom-3 left-4"
        />
      </div>
      <Stack
        p={2}
        sx={{
          border: "1px solid #E6E6DC",
          borderBottomLeftRadius: "8px",
          borderBottomRightRadius: "8px",
        }}
        gap={1}
      >
        <Typography color="accent.main" fontSize={"12px"}>
          {dateFormat.format(new Date(start_date)).replace(/[\s/]/g, ".")} |{" "}
          {dateFormat.format(new Date(end_date)).replace(/[\s/]/g, ".")}
        </Typography>
        <Typography fontSize="18px" variant="body2">
          {name}
        </Typography>
        <Typography mt={1} fontSize={"12px"}>
          Budget - {budget}
        </Typography>
      </Stack>
    </ProjectCard>
  );
};

export default Project;
