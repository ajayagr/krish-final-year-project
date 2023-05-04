import { Box, Stack, Grid, TextField, Button, Typography } from "@mui/material";
import ImagePreviewList from "../../../ImagePreviewList";
import IOSSwitchComponent from "../../../inputs/IOSSwitch";
import { useState, useRef, useMemo, useCallback } from "react";
import AttachmentIcon from "@mui/icons-material/Attachment";
import { IDailyStatusFormData } from "../../../../pages/project/TaskStatus";
import { fileToBlob } from "../../../../utils/fileUtils";

interface IStatusOperationForm {
  data: IDailyStatusFormData;
  onSubmit: (data: Record<string, any>) => void;
  onCancel: () => void;
}

const StatusOperationForm = ({
  data,
  onSubmit,
  onCancel,
}: IStatusOperationForm) => {
  const [isOnTime, setIsOnTime] = useState(data.isOnTime ?? true);
  const [workerCount, setWorkerCount] = useState(data.workerCount ?? "");
  const [machineCount, setMachineCount] = useState(data.machineCount ?? "");
  const [description, setDescription] = useState(data.description ?? "");
  const [fileUploadData, setFileUploadData] = useState<Array<File | Blob>>(
    [...data.images] ?? []
  );
  const fileUploadRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let images: Blob[] = [];
    for (let i = 0; i < fileUploadData.length; i++) {
      const file = fileUploadData[i];
      const blob = file instanceof File ? await fileToBlob(file) : file;
      images.push(blob);
    }
    const data = {
      workerCount,
      machineCount,
      description,
      isOnTime,
      images,
    };
    console.log(data);
    onSubmit(data);
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

  const handlePreviewDelete = useCallback(
    (index: number) => {
      fileUploadData.splice(index, 1);
      setFileUploadData([...fileUploadData]);
    },
    [fileUploadData]
  );

  const MemoizedImagePreview = useMemo(
    () => (
      <ImagePreviewList
        images={fileUploadData}
        onDelete={handlePreviewDelete}
      />
    ),
    [fileUploadData, handlePreviewDelete]
  );

  return (
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
            value={workerCount}
            onChange={(e) => setWorkerCount(Number(e.target.value))}
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
            value={machineCount}
            onChange={(e) => setMachineCount(Number(e.target.value))}
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          name="description"
          label="Description"
          type="text"
          id="description"
          placeholder="Description of task done today"
        />
        <Grid container alignItems={"center"}>
          <Button
            variant="text"
            endIcon={<AttachmentIcon sx={{ transform: "rotate(135deg)" }} />}
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
        <Grid container>{MemoizedImagePreview}</Grid>
        <Grid container mt="auto" mb="2" justifyContent={"end"} gap={2}>
          <Button variant="outlined" onClick={() => onCancel()}>
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </Grid>
      </Stack>
    </Box>
  );
};

export default StatusOperationForm;
