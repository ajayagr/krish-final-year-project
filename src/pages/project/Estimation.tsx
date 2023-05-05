import React, { useState } from "react";
import BreadCrumb, { PathType } from "../../components/BreadCrumb";
import { Table } from "antd";
import { Typography, Stack, Box } from "@mui/material";
import Button from '@mui/material/Button';

interface Task {
  id: number;
  taskName: string;
  unit: string | null;
  quanity: number | null;
  rate: number | null;
  lumpsump: number | null;
  amount: number;
  lastUpdated: Date;
}

const initialData: Task[] = [
  {
    id: 1,
    taskName: "Task 1",
    unit: "cu/ft",
    quanity: 100,
    rate: 200,
    lumpsump: null,
    amount: 20000,
    lastUpdated: new Date(),
  },
  {
    id: 2,
    taskName: "Task 2",
	unit: "cu/ft",
	quanity: 2000,
	rate: 50,
	lumpsump: null,
	amount: 100000,
    lastUpdated: new Date(),
  },
  {
    id: 3,
    taskName: "Task 3",
	unit: "sq/ft",
	quanity: 2000,
	rate: 70,
	lumpsump: null,
	amount: 140000,
    lastUpdated: new Date(),
  },
  {
    id: 4,
    taskName: "Task 4",
	unit: "sq/ft",
	quanity: 1200,
	rate: 75,
	lumpsump: null,
	amount: 90000,
    lastUpdated: new Date(),
  },
  {
    id: 5,
    taskName: "Task 5",
	unit: null,
	quanity: null,
	rate: null,
	lumpsump: 120000,
	amount: 120000,
    lastUpdated: new Date(),
  },
  {
    id: 6,
    taskName: "Task 6",
	unit: "Persons",
	quanity: 500,
	rate: 120,
	lumpsump: null,
	amount: 60000,
    lastUpdated: new Date(),
  },
  {
    id: 7,
    taskName: "Task 7",
	unit: null,
	quanity: null,
	rate: null,
	lumpsump: 40000,
	amount: 40000,
    lastUpdated: new Date(),
  },
  {
    id: 8,
    taskName: "Task 8",
	unit: "Persons",
	quanity: 300,
	rate: 300,
	lumpsump: null,
	amount: 90000,
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
    title: "Task Name",
    dataIndex: "taskName",
    key: "taskName",
  },
  {
    title: "Unit",
    dataIndex: "unit",
    key: "unit",
    editable: true,
  },
  {
    title: "Quanity",
    dataIndex: "quanity",
    key: "quanity",
	  editable: true,
  },
  {
    title: "Rate",
    dataIndex: "rate",
    key: "rate",
    editable: true,
  },
  {
    title: "Lumpsump",
    dataIndex: "lumpsump",
    key: "lumpsump",
    editable: true,
  },
  {
    title: "Amount",
    dataIndex: "Amount",
    key: "Amount",
  },
  {
    title: "Last Updated",
    dataIndex: "lastUpdated",
    key: "lastUpdated",
    render: (date: Date) => <span>{date.toLocaleDateString('en-GB')}</span>,
  },
];

const Estimation: React.FC = () => {
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
        <Stack direction={"row"} spacing={90} >
          <Typography variant="h4">Task Estimation</Typography>
          <Box display="flex" justifyContent="end">
            <Button variant="text">Save Changes</Button>
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

export default Estimation;
