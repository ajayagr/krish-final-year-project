import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AttachmentIcon from "@mui/icons-material/Attachment";
import { useNavigate, useParams } from "react-router";
import ShortCalendar from "../../components/Calendar/ShortCalendar";
import dayjs from "dayjs";
import { taskList } from "../../constants/options";
import { useEffect, useRef, useState } from "react";
import IOSSwitchComponent from "../../components/inputs/IOSSwitch";
import ImagePreviewList from "../../components/ImagePreviewList";

const getTaskItems = () => {
  const taskNum = Math.max(1, Math.round(Math.random() * 3));
  const items: string[] = [];
  for (let i = 0; i < taskNum; i++) {
    let item = taskList[Math.round(Math.random() * taskList.length)];
    while (items.includes(item)) {
      item = taskList[Math.round(Math.random() * taskList.length)];
    }
    items.push(item);
  }
  return items;
};

const TaskStatus = () => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [selectedTask, setSelectedTask] = useState("");
  const { date } = useParams();
  const navigate = useNavigate();

  const selectedDate = new Date(date as string);
  const month = selectedDate.toLocaleString("default", { month: "long" });
  const day = selectedDate.toLocaleString("default", { weekday: "long" });

  const onDateChange = (a: dayjs.Dayjs | null) => {
    if (!a) {
      return;
    }
    navigate(`/project/status/${a.format("YYYY-MM-DD")}`);
  };

  useEffect(() => {
    const tasks = getTaskItems();
    setTasks(tasks);
    tasks.length === 1 ? setSelectedTask(tasks[0]) : setSelectedTask("");
  }, [date]);

  return (
    <div className="w-full">
      <Grid container alignItems={"baseline"} justifyContent={"center"}>
        <Grid item component="p" className="divide-x-4" xs>
          <span>
            <Typography variant="h4" component={"span"} fontWeight={700}>
              {`${selectedDate.getDate()} ${month}`}
            </Typography>
            <Typography variant="h4" component={"span"} fontWeight={500} ml={1}>
              {selectedDate.getFullYear()}
            </Typography>
          </span>
          <Typography
            variant="h4"
            component={"span"}
            fontWeight={500}
            ml={2}
            pl={2}
          >
            {day}
          </Typography>
        </Grid>
        <Grid>
          <Button variant="text">
            <Typography
              textTransform={"none"}
              color="primary"
              className="underline"
            >
              Day
            </Typography>
          </Button>
          <Button variant="text">
            <Typography
              textTransform={"none"}
              color="primary"
              onClick={() =>
                navigate("/project/calendar", { relative: "route" })
              }
            >
              Month
            </Typography>
          </Button>
        </Grid>
      </Grid>
      <Grid container className="divide-x-2" mt={5}>
        <Grid item xs={5} pr={8}>
          <Box bgcolor="#F9F9F9">
            <ShortCalendar
              defaultSelectedValue={
                date ? date : new Date().toLocaleDateString()
              }
              onChange={onDateChange}
            />
          </Box>
          <Box mt={4}>
            <Typography variant="h5">Tasks for the day</Typography>
            <List sx={{ mt: 2 }}>
              {tasks.map((task) => {
                return (
                  <ListItem
                    sx={{
                      mb: 2,
                      backgroundColor: "#E8EDFA",
                      borderRadius: "40px",
                    }}
                    key={task}
                    onClick={() => setSelectedTask(task)}
                  >
                    <Typography variant="body1" fontWeight={500}>
                      {task}
                    </Typography>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Grid>
        <Grid item xs px={3} display="flex" flexDirection={"column"}>
          <StatusOperations date={date ?? ""} task={selectedTask} />
        </Grid>
      </Grid>
    </div>
  );
};

interface IStatusOperations {
  date: string;
  task: string;
}

const StatusOperations = ({ date, task }: IStatusOperations) => {
  const [showForm, setShowForm] = useState(false);
  const [isOnTime, setIsOnTime] = useState(true);
  const [fileUploadData, setFileUploadData] = useState<File[]>([]);
  const fileUploadRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const resetForm = () => {
    setIsOnTime(true);
    setFileUploadData([]);
    if (fileUploadRef.current) {
      fileUploadRef.current.value = "";
    }
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("worker-count"),
      password: data.get("machine-count"),
      description: data.get("description"),
      isDelayed: isOnTime,
    });
    if (fileUploadRef.current) {
      fileUploadRef.current.value = "";
      setFileUploadData([]);
    }
  };

  const handleFileUpload = () => {
    if (!fileUploadRef.current || !fileUploadRef.current.files?.length) {
      return;
    }
    let files: File[] = [];
    for (let i = 0; i < fileUploadRef.current.files.length ?? 0; i++) {
      files.push(fileUploadRef.current.files.item(i) as File);
    }
    setFileUploadData(files);
    fileUploadRef.current.value = "";
  };

  const handlePreviewDelete = (item: File, index: number) => {
    fileUploadData.splice(index, 1);
    setFileUploadData([...fileUploadData]);
  };

  useEffect(() => {
    setShowForm(false);
    resetForm();
  }, [date, task]);

  if (!date || !task) {
    return (
      <Typography variant={"h6"}>
        Please select a task to view its status.
      </Typography>
    );
  }

  return (
    <>
      <Typography variant="h5">Status</Typography>
      {showForm ? (
        <Box
          ref={formRef}
          component="form"
          onSubmit={handleSubmit}
          noValidate
          mt={1}
          flex={1}
        >
          <Stack className="h-full">
            <Grid item alignSelf={"flex-end"}>
              <IOSSwitchComponent
                checked={isOnTime}
                onLabel="On Time"
                offLabel="Mark Delay"
                ariaLabel="Task Status"
                onChange={(
                  event: React.ChangeEvent<HTMLInputElement>,
                  checked: boolean
                ) => setIsOnTime(checked)}
              />
            </Grid>
            <Grid container gap={2}>
              <TextField
                margin="normal"
                required
                id="worker-count"
                label="Worker Count"
                type="number"
                name="worker-count"
                placeholder="0"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                name="machine-count"
                label="Machine Count"
                type="number"
                placeholder="0"
                id="machine-count"
              />
            </Grid>
            <TextField
              margin="normal"
              multiline
              rows={5}
              required
              name="description"
              label="Description"
              type="text"
              id="description"
              placeholder="Description of task done today"
            />
            <Grid container alignItems={"center"}>
              <Button
                variant="text"
                endIcon={
                  <AttachmentIcon sx={{ transform: "rotate(135deg)" }} />
                }
                onClick={() => fileUploadRef.current?.click()}
              >
                Upload Photos
                <input
                  id="upload-files"
                  name="Upload File"
                  ref={fileUploadRef}
                  hidden
                  accept="image/*"
                  multiple
                  type="file"
                  onChange={handleFileUpload}
                />
              </Button>
              <Typography variant="caption" color="customGrey.main">
                Max File size: 2MB
              </Typography>
            </Grid>
            <Grid container>
              <ImagePreviewList
                images={fileUploadData}
                onDelete={handlePreviewDelete}
              />
            </Grid>
            <Grid container mt="auto" mb="2" justifyContent={"end"} gap={2}>
              <Button variant="outlined" onClick={() => resetForm()}>
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Save
              </Button>
            </Grid>
          </Stack>
        </Box>
      ) : (
        <Box mt={7} flex={1}>
          <Typography variant="body1" color="customGrey.main" fontSize={"20px"}>
            No Status Added
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 3 }}
            onClick={() => setShowForm(true)}
          >
            <Typography color="white" textTransform={"none"}>
              Add Status
            </Typography>
          </Button>
        </Box>
      )}
    </>
  );
};

export default TaskStatus;
