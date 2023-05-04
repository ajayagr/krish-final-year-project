import { useNavigate, useParams } from "react-router-dom";
import { TApplication } from "../../../../constants/project";
import { Typography } from "@mui/material";

interface IApplicationParams {
  application: TApplication;
}

const Application = ({ application }: IApplicationParams) => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const naviagateToUrl = `/project/${projectId}/${application.url}`;

  return (
    <div role="listitem" onClick={() => navigate(naviagateToUrl)}>
      <img src={application.imagePath} alt={application.name} />
      <Typography variant="body1">{application.name}</Typography>
    </div>
  );
};

export default Application;
