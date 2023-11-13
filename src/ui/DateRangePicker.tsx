import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface DateRangeProps {
  startDate: Date;
  endDate: Date;
  key: string;
}

interface BookingProps {
  bookings: [
    {
      id: string;
      dateFrom: string;
      dateTo: string;
      guests: number;
      created: string;
      updated: string;
    }
  ];
  selectedDateRange: DateRangeProps[];
  onDateRangeChange: (newDateRange: DateRangeProps) => void;
}

interface CustomDateRange extends DateRangeProps {}

function BookingDateRangePicker({ bookings, selectedDateRange, onDateRangeChange }: BookingProps) {
  const bookedDateRanges = bookings.map((booking) => ({
    startDate: new Date(booking.dateFrom),
    endDate: new Date(booking.dateTo),
    key: booking.id,
  }));

  const disabledDates = (date: Date) => {
    return bookedDateRanges.some(
      (bookedDateRange) =>
        (date >= bookedDateRange.startDate && date <= bookedDateRange.endDate) ||
        date === bookedDateRange.startDate ||
        date === bookedDateRange.endDate
    );
  };

  const handleRangeChange = (range: { selection: CustomDateRange }) => {
    const selectedDateRange = range.selection;
    onDateRangeChange(selectedDateRange);
  };

  return (
    <div>
      <DateRangePicker
        direction="horizontal"
        editableDateInputs={true}
        moveRangeOnFirstSelection={false}
        onChange={handleRangeChange}
        months={2}
        disabledDay={disabledDates}
        ranges={selectedDateRange}
        preventSnapRefocus={false}
        calendarFocus="backwards"
      />
    </div>
  );
}

export default BookingDateRangePicker;
