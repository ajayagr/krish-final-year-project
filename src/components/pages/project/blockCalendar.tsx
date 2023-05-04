import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton, Stack, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { DatePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

interface IBlockCalendar {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function BlockCalendar({ open, setOpen }: IBlockCalendar) {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [numDays, setNumDays] = useState<number>(0);
  const [reason, setReason] = useState<string>("");

  const handleClose = () => {
    setOpen(false);
    setStartDate(undefined);
    setEndDate(undefined);
    setNumDays(0);
  };

  const handleConfirm = () => {
    handleClose();
  };

  useEffect(() => {
    if (startDate && endDate) {
      const end = dayjs(endDate);
      const start = dayjs(startDate);
      setNumDays(end.diff(start, "days") + 1);
    }
  }, [endDate, startDate]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle
        component={"div"}
        display={"flex"}
        bgcolor={"customLight.light"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="h6" component={"h2"} fontWeight={"600"}>
          Block Calendar
        </Typography>
        <IconButton aria-label="delete" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ width: "456px", mt: 2 }}>
        <Box display={"flex"}>
          <ErrorOutlineOutlinedIcon color="primary" />
          <Typography
            variant="body1"
            color={"customGrey.main"}
            lineHeight={1.5}
            ml={1}
          >
            Blocking calendar will push the project with the number of days
            selected
          </Typography>
        </Box>
        <Stack component="form" py={3} gap={2}>
          <DatePicker
            label="Select start date"
            className="w-full"
            disablePast
            onChange={(e: any) => setStartDate(e.toDate())}
          />
          <DatePicker
            label="Select end date"
            className="w-full"
            disabled={!startDate}
            disablePast
            onChange={(e: any) => setEndDate(e.toDate())}
            minDate={dayjs(startDate)}
          />
          <TextField
            fullWidth
            disabled
            id="number-of-days"
            label="Number of days"
            type="number"
            name="number-of-days"
            value={numDays}
          />
          <TextField
            fullWidth
            required
            id="reason"
            label="Reason"
            name="number-of-days"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={handleConfirm}
            disabled={!(numDays && reason)}
            sx={{ width: "min-content" }}
          >
            <Typography variant="body1" color="white" ml="auto">
              Confirm
            </Typography>
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
