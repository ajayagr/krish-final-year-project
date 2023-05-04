import { useParams } from "react-router-dom";
import { TApplication } from "../../../../constants/project";
import { Typography, styled } from "@mui/material";
import CustomLink from "../../../routing/CustomLink";

interface IApplicationParams {
  application: TApplication;
}

const ApplicationCard = styled(CustomLink)(({ theme }) => ({
  height: "140px",
  width: "168px",
  paddingTop: "20px",
  paddingBottom: "25px",
  borderRadius: "20px",
  backgroundColor: theme.palette.customBgColor.main,
  "&:hover, &:focus": {
    backgroundColor: "#E8EDFA",
    border: `1px solid ${theme.palette.primary.main}`,
  },
}));

const Application = ({ application }: IApplicationParams) => {
  const { projectId } = useParams();
  const naviagateToUrl = `/project/${projectId}/${application.url}`;

  return (
    <ApplicationCard
      underline="none"
      tabIndex={0}
      role="listitem"
      to={naviagateToUrl}
      className="cursor-pointer flex flex-col items-center justify-center"
    >
      <img
        src={application.imagePath}
        alt={application.name}
        height="60"
        width="60"
      />
      <Typography
        variant="body1"
        color="primary.main"
        fontWeight={500}
        pt="14px"
      >
        {application.name}
      </Typography>
    </ApplicationCard>
  );
};

export default Application;
