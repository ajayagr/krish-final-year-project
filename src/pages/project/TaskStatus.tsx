import dayjs from "dayjs";
import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ShortCalendar from "../../components/Calendar/ShortCalendar";
import { taskList } from "../../constants/options";
import StatusOperationForm from "../../components/pages/project/status/statusOperationForm";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import StatusOperationView from "../../components/pages/project/status/statusOperationView";

const getTaskItems = () => {
  const taskNum = Math.max(1, Math.round(Math.random() * 3));
  const items: string[] = [];
  for (let i = 0; i < taskNum; i++) {
    let item = taskList[Math.round(Math.random() * taskList.length - 1)];
    while (!item || items.includes(item)) {
      item = taskList[Math.round(Math.random() * taskList.length - 1)];
    }
    items.push(item);
  }
  return items;
};

const dailyStatus: IDailyStatusReadData = {
  description: "This is a sample description",
  machineCount: 10,
  workerCount: 10,
  projectStatus: "On Time",
  images: [],
};

const TaskStatus = () => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [selectedTask, setSelectedTask] = useState("");
  const { date, projectId } = useParams();
  const navigate = useNavigate();

  console.log(date, projectId);

  const selectedDate = new Date(date as string);
  const month = selectedDate.toLocaleString("default", { month: "long" });
  const day = selectedDate.toLocaleString("default", { weekday: "long" });

  const onDateChange = (a: dayjs.Dayjs | null) => {
    if (!a) {
      return;
    }
    navigate(`/project/${projectId}/status/${a.format("YYYY-MM-DD")}`);
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
                navigate(`/project/${projectId}/calendar`, {
                  relative: "route",
                })
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
              disableFuture
              minDate={dayjs(
                date ? date : new Date().toLocaleDateString()
              ).subtract(14, "days")}
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
                      cursor: "pointer",
                    }}
                    key={task}
                    onClick={() => setSelectedTask(task)}
                  >
                    <Typography
                      variant="body1"
                      fontWeight={selectedTask === task ? 700 : 500}
                      fontSize={selectedTask === task ? "20px" : "16px"}
                    >
                      {task}
                    </Typography>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Grid>
        <Grid item xs px={3} display="flex" flexDirection={"column"}>
          <StatusOperations
            date={date ?? ""}
            task={selectedTask}
            data={{ ...dailyStatus }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

interface IDailyStatusData {
  workerCount: number;
  machineCount: number;
  description: string;
  images: Array<File | Blob>;
}

export interface IDailyStatusReadData extends IDailyStatusData {
  projectStatus: string;
}

export interface IDailyStatusFormData extends IDailyStatusData {
  isOnTime: boolean;
}

interface IStatusOperations {
  date: string;
  task: string;
  data: IDailyStatusReadData;
}

const StatusOperations = ({ date, task, data }: IStatusOperations) => {
  const [showForm, setShowForm] = useState(false);
  const [viewData, setViewData] = useState<IDailyStatusReadData>({ ...data });
  const [formData, setFormData] = useState<IDailyStatusFormData>(
    {} as IDailyStatusFormData
  );

  useEffect(() => {
    setShowForm(false);
  }, [date, task]);

  useEffect(() => {
    const formData: Record<string, any> = {
      ...data,
      isOnTime: data.projectStatus === "On Time" ? true : false,
    };
    delete formData.projectStatus;
    setFormData(formData as IDailyStatusFormData);
    setViewData(data);
  }, [data]);

  const handleSubmit = (data: Record<string, any>) => {
    const readData: Record<string, any> = {
      ...data,
      projectStatus: data.isOnTime ? "On Time" : "Delayed",
    };
    delete readData.isOnTime;
    setFormData(data as IDailyStatusFormData);
    setViewData(readData as IDailyStatusReadData);
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  if (!date || !task) {
    return (
      <Typography variant={"h6"}>
        Please select a task to view its status.
      </Typography>
    );
  }

  return (
    <>
      <Stack direction="row" gap={2} alignItems={"center"}>
        <Typography variant="h5">Status</Typography>
        {viewData.projectStatus && !showForm ? (
          <Button
            variant="text"
            endIcon={<BorderColorOutlinedIcon color="primary" />}
            onClick={() => setShowForm(true)}
          >
            <Typography variant="body1" fontWeight={500} color="primary">
              Edit
            </Typography>
          </Button>
        ) : (
          <></>
        )}
      </Stack>
      {showForm ? (
        <StatusOperationForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          data={formData}
        />
      ) : (
        <></>
      )}
      {viewData.projectStatus && !showForm ? (
        <Box mt={2}>
          <StatusOperationView {...viewData} />
        </Box>
      ) : (
        <></>
      )}
      {!viewData.projectStatus ? (
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
      ) : (
        <></>
      )}
    </>
  );
};

export default TaskStatus;
