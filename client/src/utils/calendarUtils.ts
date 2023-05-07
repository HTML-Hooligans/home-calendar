export const formatDate = (date: string | Date) => {
  const day = new Date(date).getDate();
  const month = new Date(date).getMonth();
  const year = new Date(date).getFullYear();

  return month + '/' + day + '/' + year;
};

export const isSameDay = (dDate: string, date: Date) => {
  const eventDate = formatDate(dDate);
  const calendarDate = formatDate(date);

  return eventDate === calendarDate;
};
