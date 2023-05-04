export interface IOption {
  label: string;
  value: any;
}

export enum Designations {
  CHIEF_ENGINEER = "CE",
  SITE_ENGINEER = "SE",
}

export const designationOptions: IOption[] = [
  { label: "Chief Engineer", value: "CE" },
  { label: "Site Engineer", value: "SE" },
];

export const taskList = [
  "Marking & Grading",
  "Excavation",
  "Concreting",
  "Carpentry",
  "Plumbing",
  "Electrical",
];
