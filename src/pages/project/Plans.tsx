import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import BreadCrumb, { PathType } from "../../components/BreadCrumb";
import { Designations } from "../../constants/options";
import { TPlan } from "../../constants/project";
import store, { RootState } from "../../store";
import Plan from "../../components/pages/project/plans/Plan";
import { useCallback, useMemo, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { formatDate } from "../../utils/dateUtils";
import { addPlan, deletePlan } from "../../store/project";
import { useSelector } from "react-redux";
import AttachmentIcon from "@mui/icons-material/Attachment";
import ImagePreviewList from "../../components/ImagePreviewList";

const Plans = () => {
  const { user, project } = useSelector((store: RootState) => store);
  const [selectedPlan, setSelectedPlan] = useState<TPlan | null>(null);
  const [showUpload, setShowUpload] = useState<boolean>(false);

  const handleDelete = (index: number) => {
    store.dispatch(deletePlan(index));
  };

  const handleAddPlan = (plan: TPlan) => {
    store.dispatch(addPlan(plan));
  };

  const handleUploadClose = () => {
    setShowUpload(false);
  };

  return (
    <Stack>
      <BreadCrumb pathType={PathType.plans} />
      <Stack gap="25px" pb={8}>
        <Box className="flex justify-between items-center">
          <Typography variant="h5">Plans</Typography>
          {user.role === Designations.CHIEF_ENGINEER ? (
            <Button
              variant="contained"
              endIcon={<CreateNewFolderIcon />}
              onClick={() => setShowUpload(true)}
            >
              Upload
            </Button>
          ) : null}
        </Box>
        <Grid container spacing={3} justifyContent={"stretch"}>
          {project.plans.map((plan, idx) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={plan.name}>
              <Plan
                plan={plan}
                selectPlan={setSelectedPlan}
                deletePlan={() => handleDelete(idx)}
              />
            </Grid>
          ))}
        </Grid>
      </Stack>
      {selectedPlan ? (
        <PlanDetail
          plan={selectedPlan}
          handleClose={() => setSelectedPlan(null)}
        />
      ) : (
        <></>
      )}
      {showUpload ? (
        <UploadPlan handleClose={handleUploadClose} addPlan={handleAddPlan} />
      ) : (
        <></>
      )}
    </Stack>
  );
};

interface IPlanDetailParams {
  plan: TPlan;
  handleClose: () => void;
}

const FullSizePlanImage = styled("img")({
  width: "100%",
  minHeight: "80vh",
});

const PlanDetail = ({ plan, handleClose }: IPlanDetailParams) => {
  const { name, description, filePath, uploadDate } = plan;
  const downloadFileRef = useRef<HTMLAnchorElement>(null);

  return (
    <Dialog fullWidth={true} maxWidth={"xl"} open={true} onClose={handleClose}>
      <DialogTitle
        className="flex items-center justify-between"
        sx={{ bgcolor: "customLight.light" }}
      >
        <span>{name}</span>
        <span>
          <CloseIcon className="cursor-pointer" onClick={handleClose} />
        </span>
      </DialogTitle>
      <DialogContent sx={{ p: "0" }}>
        <Grid container>
          <Grid item xs={9}>
            <FullSizePlanImage src={filePath} alt={description} />
          </Grid>
          <Grid item xs={3} mt={3} px={3}>
            <a
              ref={downloadFileRef}
              href={filePath}
              download
              className="hidden"
            >
              Download file for plan {name}
            </a>
            <Button
              variant="contained"
              onClick={() => downloadFileRef?.current?.click()}
            >
              Download
            </Button>
            <Stack gap={3} mt={3}>
              <div>
                <Typography variant="h6">File Name</Typography>
                <Typography>{name}</Typography>
              </div>
              <div>
                <Typography variant="h6">Upload Date</Typography>
                <Typography>{formatDate(uploadDate)}</Typography>
              </div>
              <div>
                <Typography variant="h6">Description</Typography>
                <Typography>{description}</Typography>
              </div>
            </Stack>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

interface IUploadPlanParams {
  handleClose: () => void;
  addPlan: (plan: TPlan) => void;
}

const UploadPlan = ({ addPlan, handleClose }: IUploadPlanParams) => {
  const planFormRef = useRef<HTMLFormElement>(null);
  const fileUploadRef = useRef<HTMLInputElement>(null);

  const [fileName, setFileName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

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

  const handleSubmit = () => {
    const plan: TPlan = {
      description: description,
      name: fileName,
      uploadDate: new Date().toDateString(),
      filePath: URL.createObjectURL(uploadedFile as File),
    };
    addPlan(plan);
    handleClose();
  };

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

  return (
    <Dialog fullWidth={true} maxWidth={"xs"} open={true} onClose={handleClose}>
      <DialogTitle
        className="flex items-center justify-between"
        sx={{ bgcolor: "customLight.light" }}
      >
        <span>Upload</span>
        <span>
          <CloseIcon className="cursor-pointer" onClick={handleClose} />
        </span>
      </DialogTitle>
      <DialogContent>
        <Stack
          mt={3}
          component={"form"}
          ref={planFormRef}
          id="upload-plan-form"
        >
          <TextField
            margin="normal"
            required
            id="file-name"
            label="File Name"
            type="text"
            name="file-name"
            onChange={(e) => setFileName(e.target.value)}
            placeholder="Enter file name"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            multiline
            rows={3}
            id="description"
            label="Description"
            type="text"
            name="description"
            placeholder="Enter plan description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <Grid container alignItems={"center"} mt={1}>
            <Button
              variant="text"
              endIcon={<AttachmentIcon sx={{ transform: "rotate(135deg)" }} />}
              onClick={() => fileUploadRef.current?.click()}
            >
              Upload File
              <input
                id="upload-file"
                name="upload-file"
                ref={fileUploadRef}
                hidden
                accept="image/*"
                type="file"
                onChange={handleFileUpload}
              />
            </Button>
            <Typography variant="caption" color="customGrey.main">
              Max File size: 10MB
            </Typography>
          </Grid>
          {uploadedFile ? <>{MemoizedImagePreview}</> : <></>}
        </Stack>
        <DialogActions>
          <Button
            type="submit"
            variant="contained"
            onClick={handleSubmit}
            disabled={!(fileName && description && uploadedFile)}
          >
            Confirm
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default Plans;
