import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

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
}

function DateRangePicker({ bookings }: BookingProps) {
  return <div></div>;
}

export default DateRangePicker;
