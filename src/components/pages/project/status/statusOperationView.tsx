import { Box, Stack, Typography, styled } from "@mui/material";
import { IDailyStatusReadData } from "../../../../pages/project/TaskStatus";
import ImagePreviewList from "../../../ImagePreviewList";

const FieldHeading = styled(Typography)({
  fontWeight: 500,
});

const StatusOperationView = ({
  projectStatus,
  workerCount,
  machineCount,
  description,
  images,
}: IDailyStatusReadData) => {
  return (
    <Stack gap={3}>
      <Box>
        <FieldHeading variant="body1">Project Status</FieldHeading>
        <Typography variant="caption">{projectStatus}</Typography>
      </Box>
      <Stack direction={"row"} gap={3}>
        <Box>
          <FieldHeading variant="body1">Worker Count</FieldHeading>
          <Typography variant="caption">{workerCount}</Typography>
        </Box>
        <Box>
          <FieldHeading variant="body1">Machine Count</FieldHeading>
          <Typography variant="caption">{machineCount}</Typography>
        </Box>
      </Stack>
      <Box>
        <FieldHeading variant="body1">Description</FieldHeading>
        <Typography variant="caption" whiteSpace={"pre-wrap"}>
          {description}
        </Typography>
      </Box>
      <Box>
        <FieldHeading variant="body1">Photos</FieldHeading>
        <ImagePreviewList images={images} />
      </Box>
    </Stack>
  );
};

export default StatusOperationView;
