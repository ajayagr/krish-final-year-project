import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickerSelectionState } from "@mui/x-date-pickers/internals";
import dayjs from "dayjs";

interface IShortCalendarProps {
  defaultSelectedValue: string;
  onChange?:
    | ((
        value: dayjs.Dayjs | null,
        selectionState?: PickerSelectionState | undefined
      ) => void)
    | undefined;
}

const ShortCalendar = (props: IShortCalendarProps) => {
  return (
    <DateCalendar
      sx={{ width: "100%", px: 4 }}
      value={dayjs(props.defaultSelectedValue)}
      showDaysOutsideCurrentMonth
      onChange={props.onChange}
    />
  );
};

export default ShortCalendar;
