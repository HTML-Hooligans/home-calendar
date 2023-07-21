import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import pl from 'date-fns/locale/pl';
import * as styles from './BigCalendar.styles';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  pl: pl,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
// const events = [
//   {
//     id: 1,
//     eventName: 'Spotkanie',
//     eventDate: new Date(2023, 5, 25, 10, 0),
//     start: new Date(2023, 5, 25, 10, 0),
//     end: new Date(2023, 5, 25, 12, 0),
//   },
//   {
//     id: 2,
//     eventName: 'Wizyta u lekarza',
//     eventDate: new Date(2023, 5, 26, 15, 30),
//     start: new Date(2023, 5, 26, 15, 30),
//     end: new Date(2023, 5, 26, 16, 30),
//   },
//   {
//     id: 3,
//     eventName: 'Konferencja',
//     eventDate: new Date(2023, 5, 27, 9, 0),
//     start: new Date(2023, 5, 27, 9, 0),
//     end: new Date(2023, 5, 27, 17, 0),
//   },
// ];

const BigCalendarWrapper = ({ ...RestProps }) => {
  return (
    <div css={styles.calendarWrapper}>
      <Calendar
        startAccessor="eventDate"
        endAccessor="eventDate"
        titleAccessor="eventName"
        localizer={localizer}
        {...RestProps}
      />
    </div>
  );
};

export default BigCalendarWrapper;
