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

interface IBreadCrumb {
  title: string;
  url: string;
}

export interface IBreadCrumbParams {
  pathType?: PathType;
  customBreadCrumbList?: IBreadCrumb[];
}

const BreadCrumb = ({ pathType, customBreadCrumbList }: IBreadCrumbParams) => {
  const { project } = store.getState();
  const { projectId } = useParams();
  let breadCrumbList = [
    { title: "Home", url: "/my-projects" },
    { title: "My Projects", url: "/my-projects" },
    { title: project.name, url: `/project/${projectId}/dashboard` },
  ];
  if (pathType) {
    breadCrumbList.push({ title: pathType, url: `#` });
  }

  if (customBreadCrumbList) {
    breadCrumbList = customBreadCrumbList;
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
