import {
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import Header from "../../components/Layout/Header";
import BreadCrumb from "../../components/BreadCrumb";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useCallback, useMemo, useRef, useState } from "react";
import { ProjectStatus, TProject } from "../../constants/project";
import AttachmentIcon from "@mui/icons-material/Attachment";
import ImagePreviewList from "../../components/ImagePreviewList";
import store from "../../store";
import { addProject } from "../../store/projects";
import { useNavigate } from "react-router-dom";

const Locations = [
  {
    value: "BLR",
    label: "Bengaluru",
  },
  {
    value: "MUM",
    label: "Mumbai",
  },
  {
    value: "KOL",
    label: "Kolkata",
  },
  {
    value: "CHN",
    label: "Chennai",
  },
];

const NewProject = () => {
  const fileUploadRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const customBreadCrumb = [
    { title: "Home", url: "/my-projects" },
    { title: "My Projects", url: "/my-projects" },
    { title: "New", url: "#" },
  ];

  const handleFileUpload = () => {
    if (!fileUploadRef.current || !fileUploadRef.current.files?.length) {
      return;
    }
    if (fileUploadRef.current.files.length) {
      setUploadedFile(fileUploadRef.current.files.item(0));
    }
    fileUploadRef.current.value = "";
  };

  const handleFileDelete = useCallback(() => {
    setUploadedFile(null);
  }, [setUploadedFile]);

  const MemoizedImagePreview = useMemo(
    () => (
      <ImagePreviewList
        images={[uploadedFile as File]}
        onDelete={handleFileDelete}
        itemCount={2}
      />
    ),
    [uploadedFile, handleFileDelete]
  );

  const handleNewProjectCreation: React.FormEventHandler<HTMLFormElement> = (
    e
  ) => {
    e.preventDefault();
    const formData: any = e.target;
    const newProject: TProject = {
      id: uuidv4(),
      name: formData.projectName.value,
      budget: `${formData.budget.value} crore`,
      description: formData.description.value,
      start_date: startDate?.toDateString() ?? "",
      end_date: endDate?.toDateString() ?? "",
      status: ProjectStatus.Planned,
      imageUrl: URL.createObjectURL(uploadedFile as File),
      plans: [],
    };
    store.dispatch(addProject(newProject));
    navigate("/my-projects");
  };
  return (
    <>
      <Header />
      <Stack mt={3} px={11}>
        <BreadCrumb customBreadCrumbList={customBreadCrumb} />
        <Typography variant="h4">Create New Project</Typography>
        <Typography mt={2}>
          Please enter below required details to create a new project
        </Typography>
        <Grid
          container
          mt={3}
          spacing={2}
          component={"form"}
          onSubmit={handleNewProjectCreation}
        >
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              id="project-name"
              label="Project Name"
              type="text"
              name="projectName"
              placeholder="Enter project name"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="number"
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
                min: 0,
                max: 100,
              }}
              required
              id="holiday-count"
              name="holidayCount"
              label="Holiday Count"
              placeholder="Enter number of holidays"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DatePicker
              label="Select start date"
              className="w-full"
              onChange={(e: any) => setStartDate(e.toDate())}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DatePicker
              label="Select end date"
              className="w-full"
              disabled={!startDate}
              onChange={(e: any) => setEndDate(e.toDate())}
              minDate={dayjs(startDate)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              multiline
              rows={3}
              id="description"
              label="Description"
              type="text"
              name="description"
              placeholder="Enter project description"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="number"
              inputProps={{ inputMode: "numeric", pattern: "[0-9/.]*" }}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">₹</InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">crores</InputAdornment>
                ),
              }}
              id="approved-budget"
              name="budget"
              label="Approved Budget"
              placeholder="Enter approved budget amount"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="location-label">Location *</InputLabel>
              <Select
                required
                labelId="location-label"
                id="location"
                label="Location"
                defaultValue="BLR"
                name="location"
              >
                {Locations.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="text"
              endIcon={<AttachmentIcon sx={{ transform: "rotate(135deg)" }} />}
              onClick={() => fileUploadRef.current?.click()}
            >
              Upload File *
              <input
                id="upload-image"
                name="upload-image"
                ref={fileUploadRef}
                hidden
                accept="image/*"
                type="file"
                onChange={handleFileUpload}
              />
            </Button>
            {uploadedFile ? <>{MemoizedImagePreview}</> : <></>}
          </Grid>
          <Grid item xs={12} className="flex items-end mt-4">
            <Button
              type="submit"
              variant="contained"
              disabled={!(startDate && endDate && uploadedFile)}
              sx={{ marginLeft: "auto" }}
            >
              Add new project
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
};

export default NewProject;
