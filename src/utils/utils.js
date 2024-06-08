export const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
  
    const isSameDay = (date1, date2) => {
      return date1.getFullYear() === date2.getFullYear() &&
             date1.getMonth() === date2.getMonth() &&
             date1.getDate() === date2.getDate();
    };
  
    const padToTwoDigits = (num) => {
      return num.toString().padStart(2, '0');
    };
  
    if (isSameDay(date, now)) {
      return `${padToTwoDigits(date.getHours())}:${padToTwoDigits(date.getMinutes())}`;
    } else {
      return `${date.getFullYear()}-${padToTwoDigits(date.getMonth() + 1)}-${padToTwoDigits(date.getDate())} ${padToTwoDigits(date.getHours())}:${padToTwoDigits(date.getMinutes())}`;
    }
  };