import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  CustomButtonInput,
  CustomContentGenerator,
  DateSelectArg,
  DayCellContentArg,
  EventSourceInput,
} from "@fullcalendar/core";

export interface ICustomButtons {
  handleBlockCalendar: (e: MouseEvent, elem: HTMLElement) => void;
}
interface ICustomFullCalendarProps {
  handleSelect?: (arg: DateSelectArg) => void;
  dayCellContent?: CustomContentGenerator<DayCellContentArg>;
  isEditable?: boolean;
  customButtons?: ICustomButtons;
  events?: EventSourceInput;
}

const createCustomButtons = (
  handleBlockCalendar: ICustomButtons["handleBlockCalendar"]
): Record<string, CustomButtonInput> => {
  return {
    blockCalendar: {
      text: "Block Calendar",
      click: handleBlockCalendar,
    },
  };
};

const CustomFullCalendar = (props: ICustomFullCalendarProps) => {
  const customButtons = props.customButtons
    ? createCustomButtons(props.customButtons.handleBlockCalendar)
    : {};
  return (
    <div className="w-full h-full">
      <FullCalendar
        dayCellClassNames={"custom-day"}
        dayCellContent={props.dayCellContent ?? true}
        editable={props.isEditable}
        selectable
        customButtons={customButtons}
        select={(arg) => (props.handleSelect ? props.handleSelect(arg) : null)}
        plugins={[dayGridPlugin, interactionPlugin]}
        headerToolbar={{
          start: "title prev next",
          end: `${
            customButtons["blockCalendar"] ? "blockCalendar " : ""
          }dayGridWeek dayGridMonth`,
        }}
        buttonText={{
          month: "Month",
          day: "Day",
          week: "Week",
        }}
        initialView="dayGridMonth"
        events={props.events}
        eventBorderColor="transparent"
        eventTextColor="#292929"
        height={"100%"}
      />
    </div>
  );
};

export default CustomFullCalendar;
