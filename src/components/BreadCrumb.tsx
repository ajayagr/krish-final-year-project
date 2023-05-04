import { Breadcrumbs } from "@mui/material";
import CustomLink from "./routing/CustomLink";
import store from "../store";
import { useParams } from "react-router-dom";

export enum PathType {
  calendar = "Calendar",
  estimation = "Estimation",
  plans = "Plans",
  taskModule = "Task Module",
}

export interface IBreadCrumbParams {
  pathType?: PathType;
}

const BreadCrumb = ({ pathType }: IBreadCrumbParams) => {
  const { project } = store.getState();
  const { projectId } = useParams();
  const breadCrumbList = [
    { title: "Home", url: "/" },
    { title: "My Projects", url: "/my-projects" },
    { title: project.name, url: `/project/${projectId}/dashboard` },
  ];
  if (pathType) {
    breadCrumbList.push({ title: pathType, url: `#` });
  }
  return (
    <div role="presentation" className="mb-6">
      <Breadcrumbs separator=">" aria-label="breadcrumb">
        {breadCrumbList.map((breadCrumb) => (
          <CustomLink
            underline="hover"
            color="inherit"
            to={breadCrumb.url}
            key={breadCrumb.title}
          >
            {breadCrumb.title}
          </CustomLink>
        ))}
      </Breadcrumbs>
    </div>
  );
};

export default BreadCrumb;
