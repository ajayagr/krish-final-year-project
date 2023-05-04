import { Grid, Stack } from "@mui/material";
import CustomFullCalendar from "../../components/Calendar/FullCalendar";
import {
  CustomContentGenerator,
  DateSelectArg,
  DayCellContentArg,
  EventInput,
  EventSourceInput,
} from "@fullcalendar/core";
import { useNavigate } from "react-router";
import { useState } from "react";
import BlockCalendar from "../../components/pages/project/blockCalendar";
import { useParams } from "react-router-dom";

const eventTitles = ["Foundation", "Pillar"];

const generateEvents = (overlappingEvents: number): EventSourceInput => {
  const events: EventSourceInput = [
    {
      id: crypto.randomUUID(),
      title: "Foundation",
      start: Date.now(),
      end: "2023-05-10",
      allDay: true,
      classNames: ["event-class"],
      backgroundColor: "yellow",
      borderColor: "transparent",
    },
    {
      id: crypto.randomUUID(),
      title: "Pillar",
      start: Date.now(),
      end: "2023-04-12",
      allDay: true,
    },
  ];
  return events;
};

const Calendar = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [showBlockCalendar, setShowBlockCalendar] = useState(false);

  const handleDateSelect = (arg: DateSelectArg) => {
    navigate(`/project/${projectId}/status/${arg.startStr}`, {
      relative: "route",
    });
  };

  const handleBlockCalendar = (ev: MouseEvent, elem: HTMLElement) => {
    console.log(ev, elem);
    console.log("Block Calendar clicked");
    setShowBlockCalendar(true);
  };

  const events = generateEvents(1);

  const dayCellGenerator: CustomContentGenerator<DayCellContentArg> = (a) => {
    let icon = "";
    (events as EventInput[]).forEach((e) => {
      const start = new Date(e.start as number);
      const end = new Date(e.end as number);
      if (a.date < start) {
        icon = "delayed";
      } else if (a.date >= start && a.date < end) {
        icon = "on-time";
      } else if (a.date >= end) {
        icon = "missing-status";
      }
    });

    if (a.isToday) {
      icon = "";
    }

    return (
      <Grid container alignItems={"center"}>
        <Grid item>
          <span className="date-number">{a.dayNumberText}</span>
        </Grid>
        <Grid item xs display={"flex"} justifyContent={"end"}>
          <span className={`status ${icon}`} />
        </Grid>
      </Grid>
    );
  };

  return (
    <Stack className="w-full">
      <Grid item xs={12} display={"flex"} flexGrow={1}>
        <CustomFullCalendar
          isEditable={false}
          dayCellContent={dayCellGenerator}
          handleSelect={handleDateSelect}
          customButtons={{ handleBlockCalendar }}
          events={events}
        />
      </Grid>
      <Grid container mt={2} justifyContent={"end"} gap={2}>
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <span className="status on-time" />
          <span>On Time</span>
        </Stack>
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <span className="status delayed" />
          <span>Delay</span>
        </Stack>
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <span className="status missing-status" />
          <span>Missing Status</span>
        </Stack>
      </Grid>
      <BlockCalendar open={showBlockCalendar} setOpen={setShowBlockCalendar} />
    </Stack>
  );
};

export default Calendar;
