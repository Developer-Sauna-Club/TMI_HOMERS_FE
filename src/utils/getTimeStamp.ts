export const getTimeStamp = (postedDate: string) => {
  const dt = new Date(postedDate);
  const [year, month, date, hours, minutes] = [
    dt.getFullYear().toString().slice(-2),
    dt.getMonth() + 1,
    dt.getDate(),
    dt.getHours(),
    dt.getMinutes(),
  ];
  return `${year}/${month}/${date} ${hours}:${minutes}`;
};
