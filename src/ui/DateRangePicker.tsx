import { DateRange } from "react-date-range";
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

  const handleRangeChange = (range: any) => {
    const selectedDateRange = range.selection;
    onDateRangeChange(selectedDateRange);
  };

  return (
    <div>
      <DateRange
        editableDateInputs={true}
        moveRangeOnFirstSelection={false}
        onChange={handleRangeChange}
        disabledDay={disabledDates}
        ranges={selectedDateRange}
        preventSnapRefocus={false}
        calendarFocus="backwards"
      />
    </div>
  );
}

export default BookingDateRangePicker;
