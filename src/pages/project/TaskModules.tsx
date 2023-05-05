import React, { useState } from "react";
import BreadCrumb, { PathType } from "../../components/BreadCrumb";
import { Table } from "antd";
import { Typography, Stack, Box } from "@mui/material";
import Button from '@mui/material/Button';

function addDays(days: number): Date {
  return new Date(new Date().getTime()+(days*24*60*60*1000))
}

interface Task {
  id: number;
  status: string;
  taskName: string;
  startDate: Date;
  endDate: Date;
  duration: number;
  assignedTo: string;
  lastUpdated: Date;
}

const initialData: Task[] = [
  {
    id: 1,
    status: "Completed",
    taskName: "Task 1",
    startDate: new Date(),
    endDate: addDays(25),
    duration: 25,
    assignedTo: "John Doe",
    lastUpdated: new Date(),
  },
  {
    id: 2,
    status: "In Progress",
    taskName: "Task 2",
    startDate: addDays(26),
    endDate: addDays(56),
    duration: 30,
    assignedTo: "Jane Smith",
    lastUpdated: new Date(),
  },
  {
    id: 3,
    status: "In Progress",
    taskName: "Task 3",
    startDate: addDays(45),
    endDate: addDays(65),
    duration: 20,
    assignedTo: "Bill Will",
    lastUpdated: new Date(),
  },
  {
    id: 4,
    status: "In Progress",
    taskName: "Task 4",
    startDate: addDays(66),
    endDate: addDays(76),
    duration: 10,
    assignedTo: "James Strong",
    lastUpdated: new Date(),
  },
  {
    id: 5,
    status: "In Progress",
    taskName: "Task 5",
    startDate: addDays(60),
    endDate: addDays(80),
    duration: 20,
    assignedTo: "Rini Gupta",
    lastUpdated: new Date(),
  },
  {
    id: 6,
    status: "Not Started",
    taskName: "Task 6",
    startDate: addDays(81),
    endDate: addDays(95),
    duration: 15,
    assignedTo: "Aadhar Sen",
    lastUpdated: new Date(),
  },
  {
    id: 7,
    status: "Not Started",
    taskName: "Task 7",
    startDate: addDays(90),
    endDate: addDays(105),
    duration: 15,
    assignedTo: "Sachin Dhoni",
    lastUpdated: new Date(),
  },
  {
    id: 8,
    status: "Not Started",
    taskName: "Task 8",
    startDate: addDays(100),
    endDate: addDays(135),
    duration: 35,
    assignedTo: "Jeff Putin",
    lastUpdated: new Date(),
  },
  // Add more tasks as needed
];

const columns = [
  {
    title: "Sr No.",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Task Name",
    dataIndex: "taskName",
    key: "taskName",
    editable: true,
  },
  {
    title: "Start Date",
    dataIndex: "startDate",
    key: "startDate",
    render: (date: Date) => <span>{date.toLocaleDateString('en-GB')}</span>,
    editable: true,
  },
  {
    title: "End Date",
    dataIndex: "endDate",
    key: "endDate",
    render: (date: Date) => <span>{date.toLocaleDateString('en-GB')}</span>,
  },
  {
    title: "Duration (in Days)",
    dataIndex: "duration",
    key: "duration",
    editable: true,
  },
  {
    title: "Assigned to",
    dataIndex: "assignedTo",
    key: "assignedTo",
    editable: true,
  },
  {
    title: "Last Updated",
    dataIndex: "lastUpdated",
    key: "lastUpdated",
    render: (date: Date) => <span>{date.toLocaleDateString('en-GB')}</span>,
  },
];

const TaskModules: React.FC = () => {
  const [data, setData] = useState<Task[]>(initialData);
  const [currentPage, setCurrentPage] = useState(1);

  const onEdit = (id: number, field: string, value: any) => {
    const updatedData = data.map((task) =>
      task.id === id ? { ...task, [field]: value } : task
    );
    setData(updatedData);
  };

  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
  };

  return (
    <div className="table-container">
		<Stack>
		  <Stack gap="30px" >
        <BreadCrumb pathType={PathType.taskModule} />
        <Stack direction={"row"} spacing={80} >
          <Typography variant="h4">Task Module</Typography>
          <Box display="flex" justifyContent="end">
            <Button variant="text">Save Changes</Button>
            <Button variant="contained">Add Task</Button>
          </Box>
        </Stack>
		  </Stack>
      <Stack mt={2}>
        <Table
        dataSource={data.slice((currentPage - 1) * 6, currentPage * 6)}
        columns={columns.map((col) => ({
          ...col,
          onCell: (record: Task) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: (value: any) => onEdit(record.id, col.dataIndex , value),
          }),
        }))}
        pagination={{ pageSize: 6 }}
        onChange={handleTableChange}
        />
      </Stack>
		</Stack>
    </div>
  );
};

export default TaskModules;
