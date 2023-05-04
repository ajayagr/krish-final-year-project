import Calendar from "../../assets/images/calendar.png";
import Estimation from "../../assets/images/estimation.png";
import Plans from "../../assets/images/plans.png";
import TaskModule from "../../assets/images/task_module.png";
import CE1 from "../../assets/images/avatar_1.png";
import SE1 from "../../assets/images/avatar_2.png";
import SE2 from "../../assets/images/avatar_3.png";
import SE3 from "../../assets/images/avatar_4.png";
import Project1 from "../../assets/images/projects/project_1.png";
import Project2 from "../../assets/images/projects/project_2.png";
import Project3 from "../../assets/images/projects/project_3.png";
import Project4 from "../../assets/images/projects/project_4.png";
import Project5 from "../../assets/images/projects/project_5.png";
import Project6 from "../../assets/images/projects/project_6.png";
import Project7 from "../../assets/images/projects/project_7.png";
import { Designations } from "../options";

export type TApplication = {
  name: string;
  imagePath: string;
  url: string;
};

export type TContact = {
  imageUrl: string;
  name: string;
  phoneNumber: string;
};

export type TProject = {
  id: number;
  name: string;
  description: string;
  status: ProjectStatus;
  start_date: string;
  end_date: string;
  budget: string;
  imageUrl: string;
};

export enum ProjectStatus {
  Planned = "Planned",
  InProgress = "InProgress",
  Halted = "Halted",
  Completed = "Completed",
}

export const ProjectStatusDetails: Record<
  ProjectStatus,
  Record<"title" | "bgColor", string>
> = {
  Planned: {
    title: "Planned",
    bgColor: "#888888",
  },
  InProgress: {
    title: "In Progress",
    bgColor: "#0041F0",
  },
  Halted: {
    title: "Halted",
    bgColor: "#F67B09",
  },
  Completed: {
    title: "Completed",
    bgColor: "#209B54",
  },
};

export const projects: TProject[] = [
  {
    id: 12345,
    name: "The Heights at Riverfront",
    description:
      "The Heights at Riverfront is a luxurious waterfront residential complex. It features spacious apartments, state-of-the-art amenities, and breathtaking views of the river. With an elegant design and a prime location, this project is set to redefine luxury living in the city.",
    start_date: "2024-01-01",
    end_date: "2026-12-31",
    budget: "500 crore",
    status: ProjectStatus.Planned,
    imageUrl: Project1,
  },
  {
    id: 23456,
    name: "Parkview Tower",
    description:
      "Parkview Tower is a premium residential tower located in a prime location with lush greenery and scenic views. The project features world-class amenities and modern design, making it the perfect choice for those seeking a high-end urban lifestyle.",
    start_date: "2023-06-01",
    end_date: "2024-12-31",
    budget: "250 crore",
    status: ProjectStatus.InProgress,
    imageUrl: Project2,
  },
  {
    id: 34567,
    name: "Oceanfront Estates",
    description:
      "Oceanfront Estates is an exclusive beachfront residential community with stunning ocean views. The project features luxury villas with private pools, top-of-the-line amenities, and direct access to the beach. This project is designed to offer residents a luxurious and tranquil lifestyle.",
    start_date: "2025-03-01",
    end_date: "2027-12-31",
    budget: "750 crore",
    status: ProjectStatus.Planned,
    imageUrl: Project3,
  },
  {
    id: 45678,
    name: "Lakeside Meadows",
    description:
      "Lakeside Meadows is a serene residential community located on the outskirts of the city, surrounded by lush greenery and scenic lakes. The project features spacious homes with modern amenities and ample open space, making it the perfect choice for those seeking a peaceful and relaxing lifestyle.",
    start_date: "2023-09-01",
    end_date: "2025-12-31",
    budget: "300 crore",
    status: ProjectStatus.InProgress,
    imageUrl: Project4,
  },
  {
    id: 56789,
    name: "The Grove at Greenfield",
    description:
      "The Grove at Greenfield is a modern residential community featuring state-of-the-art amenities and contemporary design. With a focus on luxury and comfort, the project aims to provide residents with a seamless living experience.",
    start_date: "2024-01-01",
    end_date: "2025-12-31",
    budget: "200 crore",
    status: ProjectStatus.Completed,
    imageUrl: Project5,
  },
  {
    id: 67890,
    name: "Midtown Towers",
    description:
      "Midtown Towers is a luxurious residential tower located in the heart of the city. The project features modern design and world-class amenities, making it the perfect choice for those seeking a high-end urban lifestyle.",
    start_date: "2023-01-01",
    end_date: "2024-12-31",
    budget: "400 crore",
    status: ProjectStatus.Halted,
    imageUrl: Project6,
  },
  {
    id: 78901,
    name: "The Residences at Diamond Hill",
    description:
      "The Residences at Diamond Hill is an upscale residential community located in the foothills of the mountains. The project features luxurious homes with stunning views, top-of-the-line amenities, and ample green space. This project is designed to provide residents with a tranquil and serene living experience.",
    start_date: "2023-11-01",
    end_date: "2024-05-20",
    budget: "80 crore",
    status: ProjectStatus.Completed,
    imageUrl: Project7,
  },
];

export const applicationList: TApplication[] = [
  {
    name: "Calendar",
    imagePath: Calendar,
    url: "calendar",
  },
  {
    name: "Task Module",
    imagePath: TaskModule,
    url: "task-module",
  },
  {
    name: "Estimation",
    imagePath: Estimation,
    url: "estimation",
  },
  {
    name: "Plans",
    imagePath: Plans,
    url: "plans",
  },
];

export const contactList: Record<Designations, TContact[]> = {
  [Designations.CHIEF_ENGINEER]: [
    { imageUrl: CE1, name: "Chief Engineer 1", phoneNumber: "+91 1234567890" },
  ],
  [Designations.SITE_ENGINEER]: [
    { imageUrl: SE1, name: "Site Engineer 1", phoneNumber: "+91 1234567890" },
    { imageUrl: SE2, name: "Site Engineer 2", phoneNumber: "+91 1234567890" },
    { imageUrl: SE3, name: "Site Engineer 3", phoneNumber: "+91 1234567890" },
  ],
};
