import { Stack, Typography, styled } from "@mui/material";
import { TPlan } from "../../../../constants/project";
import DeleteIcon from "@mui/icons-material/Delete";

interface IPlanParams {
  plan: TPlan;
  selectPlan: (plan: TPlan) => void;
  deletePlan: () => void;
}

const ProjectCard = styled("div")({
  backgroundColor: "white",

  "&:hover": {
    backgroundColor: "#E8EDFA",
  },
});

const PlanImage = styled("img")({
  width: "100%",
  height: "160px",
});

const dateFormat = Intl.DateTimeFormat("en-IN", { dateStyle: "short" });

const Plan = ({ plan, selectPlan, deletePlan }: IPlanParams) => {
  const { name, description, filePath, uploadDate } = plan;

  const onDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deletePlan();
  };

  return (
    <ProjectCard
      className="cursor-pointer group"
      role="listitem"
      onClick={() => selectPlan(plan)}
    >
      <div className="relative" style={{ width: "100%" }}>
        <PlanImage src={filePath} alt={name} />
        <span className="absolute top-2 right-2 bg-white rounded-full p-2 hidden group-hover:block">
          <DeleteIcon color="primary" onClick={onDelete} />
        </span>
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
        <Typography
          color="accent.main"
          fontSize={"12px"}
          textTransform={"uppercase"}
        >
          Upload Date -{" "}
          {dateFormat.format(new Date(uploadDate)).replace(/[\s/]/g, ".")}
        </Typography>
        <Typography fontSize="18px" variant="body2">
          {name}
        </Typography>
        <Typography mt={1} fontSize={"12px"}>
          {description}
        </Typography>
      </Stack>
    </ProjectCard>
  );
};

export default Plan;
