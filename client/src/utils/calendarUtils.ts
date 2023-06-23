export const formatDate = (date: string | Date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const isSameDay = (dDate: string, date: Date) => {
  const eventDate = formatDate(dDate);
  const calendarDate = formatDate(date);

  return eventDate === calendarDate;
};

export const isDateInFuture = (date: Date) => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  return date >= currentDate;
};
