"use client";
import { FC } from "react";
import { DateRange, Range, RangeKeyDict } from "react-date-range";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
//@ts-ignore
import { pt } from "react-date-range/dist/locale";

interface CalendarProps {
  value: Range;
  disabedDates?: Date[];
  onChange: (value: RangeKeyDict) => void;
}

const Calendar: FC<CalendarProps> = ({
  value,
  disabedDates = [],
  onChange,
}) => {
  return (
    <div>
      <DateRange
        rangeColors={["#262626"]}
        ranges={[value]}
        date={new Date()}
        onChange={onChange}
        direction="vertical"
        showDateDisplay={false}
        minDate={new Date()}
        disabledDates={disabedDates}
        locale={pt}
      />
    </div>
  );
};

export default Calendar;
