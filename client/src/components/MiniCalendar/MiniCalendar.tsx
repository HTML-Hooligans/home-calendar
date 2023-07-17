import React from 'react';
import Calendar from 'react-calendar';
import * as styles from './MiniCalendar.styles';

const MiniCalendar = ({ ...restProps }) => {
  return (
    <div css={styles.miniCalendarStyles}>
      <Calendar {...restProps} />
    </div>
  );
};

export default MiniCalendar;
