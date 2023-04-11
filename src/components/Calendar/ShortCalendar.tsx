import {
  DateCalendar,
  DateCalendarProps,
} from "@mui/x-date-pickers/DateCalendar";
import { PickerSelectionState } from "@mui/x-date-pickers/internals";
import dayjs from "dayjs";

interface IShortCalendarProps extends DateCalendarProps<dayjs.Dayjs> {
  defaultSelectedValue: string;
  onChange?:
    | ((
        value: dayjs.Dayjs | null,
        selectionState?: PickerSelectionState | undefined
      ) => void)
    | undefined;
}

const ShortCalendar = ({
  defaultSelectedValue,
  onChange,
  ...rest
}: IShortCalendarProps) => {
  return (
    <DateCalendar
      {...rest}
      sx={{ width: "100%", px: 4 }}
      value={dayjs(defaultSelectedValue)}
      showDaysOutsideCurrentMonth
      onChange={onChange}
    />
  );
};

export default ShortCalendar;
