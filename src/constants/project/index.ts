import Calendar from "../../assets/images/calendar.png";
import Estimation from "../../assets/images/estimation.png";
import Plans from "../../assets/images/plans.png";
import TaskModule from "../../assets/images/task_module.png";

export type TApplication = {
  name: string;
  imagePath: string;
  url: string;
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
    url: "task_module",
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
