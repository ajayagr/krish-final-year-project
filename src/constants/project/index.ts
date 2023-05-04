import Calendar from "../../assets/images/calendar.png";
import Estimation from "../../assets/images/estimation.png";
import Plans from "../../assets/images/plans.png";
import TaskModule from "../../assets/images/task_module.png";
import CE1 from "../../assets/images/avatar_1.png";
import SE1 from "../../assets/images/avatar_2.png";
import SE2 from "../../assets/images/avatar_3.png";
import SE3 from "../../assets/images/avatar_4.png";
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
